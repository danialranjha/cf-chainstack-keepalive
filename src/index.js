async function callChainstackAPI() {
  try {
    const response = await fetch('https://solana-mainnet.core.chainstack.com/da950dbb03fefa4b12379dc95ba0b591', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'getLatestBlockhash'
      })
    });

    const result = await response.json();
    console.log('Chainstack API keepalive response:', result);
    return { success: true, result, timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('Error calling Chainstack API:', error);
    return { success: false, error: error.message, timestamp: new Date().toISOString() };
  }
}

export default {
  async fetch(request, env, ctx) {
    const result = await callChainstackAPI();
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  async scheduled(event, env, ctx) {
    const result = await callChainstackAPI();
    console.log('Scheduled keepalive completed:', result);
  }
};