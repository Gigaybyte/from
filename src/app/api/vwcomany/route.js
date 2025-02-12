import sequelize from "@/app/lib/Sequelize";

export async function GET(req) {
  try {
 
    await sequelize.authenticate();

    const [results] = await sequelize.query(`
      SELECT company_id, legal_name FROM company
    `);

    const response = new Response(
      JSON.stringify({
        message: "Company types fetched successfully",
        data: results.map((type) => ({
          value: type.company_id,
          name: type.legal_name,
        })),
        metadata: {
          totalCount: results.length,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    return response;

  } catch (error) {
    console.error("Error fetching company types:", error);

    const errorResponse = new Response(
      JSON.stringify({
        message: "Failed to fetch company types",
        errorDetails: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );

  
    return errorResponse;
  }
}
