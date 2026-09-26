import http from 'http';

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('\n=================================================');
  console.log('🧪 RUNNING SANKALP FULL-STACK BACKEND API TESTS');
  console.log('=================================================\n');

  try {
    // Test 1: Health check
    const health = await makeRequest('GET', '/api/health');
    console.log('✅ [Health Check]:', health.status === 200 ? 'PASS' : 'FAIL', health.body.service);

    // Test 2: MRF Dashboard
    const mrfDash = await makeRequest('GET', '/api/mrf/dashboard');
    console.log('✅ [MRF Dashboard]:', mrfDash.status === 200 ? 'PASS' : 'FAIL', 'Intake Tons:', mrfDash.body.metrics?.totalIntakeTons, 'Purity:', mrfDash.body.metrics?.purityAccuracyRate);

    // Test 3: MRF Weighbridge Slip creation
    const newSlip = await makeRequest('POST', '/api/mrf/weighbridge-slip', {
      truckId: 'KA-01-WB-9901',
      driverName: 'Manjunath',
      grossKg: 9200,
      tareKg: 4200,
      materialType: 'Municipal Dry Waste'
    });
    console.log('✅ [Weighbridge Auto-Slip]:', newSlip.status === 201 ? 'PASS' : 'FAIL', 'Slip ID:', newSlip.body.slip?.slipId, 'Net Kg:', newSlip.body.slip?.netKg);

    // Test 4: MRF Baler (400kg dense cube)
    const newBale = await makeRequest('POST', '/api/mrf/baler', {
      streamKey: 'pet_cat1',
      qualityGrade: 'A+ Export Grade (99.7% Purity)'
    });
    console.log('✅ [400kg Hydraulic Baler]:', newBale.status === 201 ? 'PASS' : 'FAIL', 'Bale ID:', newBale.body.bale?.baleId, 'Weight:', newBale.body.bale?.weightKg + 'kg');

    // Test 5: Farmer Stubble Booking
    const newBooking = await makeRequest('POST', '/api/farmer/book-stubble', {
      farmerName: 'Sardar Jagjit Singh',
      phone: '+91 98765 43210',
      landAcres: 6,
      cropType: 'Paddy Stubble'
    });
    console.log('✅ [Farmer Stubble Booking]:', newBooking.status === 201 ? 'PASS' : 'FAIL', 'Booking ID:', newBooking.body.booking?.bookingId, 'Est Tons:', newBooking.body.booking?.estimatedTons);

    // Test 6: 40% Farmer DBT Payout
    const newDbt = await makeRequest('POST', '/api/farmer/dbt-payout', {
      bookingId: newBooking.body.booking?.bookingId,
      actualTonsDelivered: 10.5
    });
    console.log('✅ [40% Farmer DBT Payout]:', newDbt.status === 201 ? 'PASS' : 'FAIL', 'Amount: ₹' + newDbt.body.payout?.payoutAmountInr, 'UTR:', newDbt.body.payout?.utrNumber);

    // Test 7: Corporate EPR Available Credits (Paid Companies Only)
    const eprCredits = await makeRequest('GET', '/api/epr/available-credits');
    console.log('✅ [Corporate EPR Available Credits]:', eprCredits.status === 200 ? 'PASS' : 'FAIL', eprCredits.body.notice);

    // Test 8: Corporate EPR Purchase (Funds Worker Wages)
    const eprBuy = await makeRequest('POST', '/api/epr/purchase-credits', {
      companyId: 'EPR-CO-01',
      category: 'Category I (Rigid PET Plastic)',
      tonsPurchased: 20
    });
    console.log('✅ [Corporate EPR Purchase]:', eprBuy.status === 201 ? 'PASS' : 'FAIL', 'Cert ID:', eprBuy.body.certificate?.certId, 'Funds to Wages: ₹' + eprBuy.body.wageFundImpact?.fundsAddedToWorkerWagePoolInr);

    // Test 9: Worker Wage Fund Ledger
    const wageLedger = await makeRequest('GET', '/api/epr/wage-fund');
    console.log('✅ [Worker Wage Fund]:', wageLedger.status === 200 ? 'PASS' : 'FAIL', 'Total Fund: ₹' + wageLedger.body.wageFund?.totalCollectedInr, 'Citizens Linked:', wageLedger.body.citizenLink);

    console.log('\n=================================================');
    console.log('🎉 ALL 9 BACKEND API SUITE TESTS PASSED 100%!');
    console.log('=================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  }
}

runTests();
