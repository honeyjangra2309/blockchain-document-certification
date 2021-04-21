cd %CD%\devnet
start geth --datadir node1/ --syncmode "full" --port 30311 --rpc --rpcaddr "localhost" --rpcport 8501 --rpcapi "personal,db,eth,net,web3,txpool,miner" --networkid 1515 --gasprice "1" -unlock "0xB7549faa3f0369E92706fca0a204810739bC8A98" --password password.txt --mine --allow-insecure-unlock

PAUSE