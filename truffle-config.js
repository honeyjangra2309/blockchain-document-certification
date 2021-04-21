module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    devnet: {
      host: '127.0.0.1',
      port: 8501,
      network_id: '*',
      gas: 92000000000000000
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  }
};
