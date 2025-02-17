import sequelize from "@/app/lib/Sequelize";

export async function POST(req, res) {
  try {
    const formData = await req.json();
 
    await sequelize.authenticate();


    const deleteDepartmentQuery = `
      DELETE FROM department WHERE company_id = :value;
    `;
    
    const deleteCompanyQuery = `
      DELETE FROM company WHERE company_id = :value;
    `;

    await sequelize.query(deleteDepartmentQuery, {
      replacements: {
        value: formData.company_id, 
      },
      type: sequelize.QueryTypes.DELETE,
    });

    // Execute the second delete query
    await sequelize.query(deleteCompanyQuery, {
      replacements: {
        value: formData.company_id, 
      },
      type: sequelize.QueryTypes.DELETE,
    });

    console.log("Data deleted successfully.");

    return new Response(
      JSON.stringify({ message: "Records deleted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting data:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting records",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
