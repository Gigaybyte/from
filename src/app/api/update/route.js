import sequelize from "@/app/lib/Sequelize";

export async function PUT(req, res) {
  try {
    const formData = await req.json();
 

    const id = req.nextUrl.searchParams.get('id');
    
    if (!id) {
      return new Response(
        JSON.stringify({ message: "ID is required for updating!" }),
        { status: 400 }
      );
    }  

  

    await sequelize.authenticate();

   
    const query = `
    UPDATE company
    SET
      company_type = :value1,
      legal_name = :value2,
      trading_name = :value3,
      abn_number = :value4,
      acn_number = :value5,
      arbn_number = :value6,
      incorporation_number = :value7,
      other_license_number = :value8
       WHERE company_id = :id;
  `;
  
    await sequelize.query(query, {
      replacements: {
        id, 
        value1: formData.companyType,
        value2: formData.legalName,
        value3: formData.tradingName,
        value4: formData.abnNumber,
        value5: formData.acnNumber,
        value6: formData.arbnNumber,
        value7: formData.incorporationNumber,
        value8: formData.otherLicenseNumber,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    console.log("Data updated successfully.");

    return new Response(
      JSON.stringify({ message: "Data updated successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return new Response(
      JSON.stringify({
        message: "Error updating data",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
