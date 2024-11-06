async function fetchShipment() {
  try {
    const response = await fetch(
      "https://inv-tracker.onrender.com/trackingNumber/EZ1000000001"
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
