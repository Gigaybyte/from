
import sequelize from "@/app/lib/Sequelize";

export async function POST(req, res) {
  try {
    const formData = await req.json();
    console.log(formData);

    await sequelize.authenticate();

    const query = `
      INSERT INTO company (company_type, legal_name, trading_name, abn_number, acn_number, arbn_number, incorporation_number, other_license_number)
      VALUES (:value1, :value2,:value3 ,:value4,:value5, :value6, :value7,:value8);
    `;

    await sequelize.query(query, {
      replacements: {
        value1: formData.companyType,
        value2: formData.legalName,
        value3: formData.tradingName,
        value4: formData.abnNumber,
        value5: formData.acnNumber,
        value6: formData.arbnNumber,
        value7: formData.incorporationNumber,
        value8: formData.otherLicenseNumber,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    console.log("Data inserted successfully.");

    return new Response(
      JSON.stringify({ message: "Form submitted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return new Response(
      JSON.stringify({
        message: "Error submitting form",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
