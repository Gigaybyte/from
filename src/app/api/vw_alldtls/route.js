import sequelize from "@/app/lib/Sequelize";

export async function GET(req) {
  try {
 
    await sequelize.authenticate();
    const [results] = await sequelize.query(`
    SELECT *, DATE(insert_at) AS dt
    FROM company
    ORDER BY insert_at DESC;
    `);
    
     const response = new Response(
      JSON.stringify({
        message: "Company types fetched successfully",
        data: results,
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
