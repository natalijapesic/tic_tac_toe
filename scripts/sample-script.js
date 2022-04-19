const { Contract, getAccountByName } = require("secret-polar");

async function run () {
  const contract_owner = getAccountByName("a");
  const contract = new Contract("tic_tac_toe");
  await contract.parseSchema();

  const deploy_response = await contract.deploy(
    contract_owner,
    { // custom fees
      amount: [{ amount: "750000", denom: "uscrt" }],
      gas: "3000000",
    }
  );
  console.log(deploy_response);

  const contract_info = await contract.instantiate({}, "deploy test", contract_owner);
  console.log(contract_info);


  const create_room = await contract.tx.create_room({account: contract_owner}, {room_id:"nignite", x_player: "secret1cfhxllwd5ku840wzk3zuh9xcync4svlnv27ayf", o_player: "secret18yac3wqw0f25wsjhffuf9f5wdaq7ttwnqpvl6d"});
  console.log(create_room);

  const response = await contract.query.get_room({room_id:"nignite"});
  console.log(response);

  const transferAmount = [{"denom": "uscrt", "amount": "15000000"}] // 15 SCRT
  const customFees = { // custom fees
    amount: [{ amount: "750000", denom: "uscrt" }],
    gas: "3000000",
  }

  const response1 = await contract.tx.play(
    {account: contract_owner, transferAmount: transferAmount},{ room_id: "nignite", player_move: "X", position: 2} 
  );

  console.log(response1);

  const response2 = await contract.tx.play(
    {account: contract_owner, transferAmount: transferAmount},{ room_id: "nignite", player_move: "O", position: 1} 
  );

  console.log(response2);

  const response3 = await contract.tx.play(
    {account: contract_owner, transferAmount: transferAmount},{ room_id: "nignite", player_move: "X", position: 4} 
  );

  console.log(response3);
  const response4 = await contract.tx.play(
    {account: contract_owner, transferAmount: transferAmount},{ room_id: "nignite", player_move: "O", position: 6} 
  );

  console.log(response4);

  const responseQ = await contract.query.get_room({room_id:"nignite"});
  console.log(responseQ);

  const response5 = await contract.tx.play(
    {account: contract_owner, transferAmount: transferAmount},{ room_id: "nignite", player_move: "X", position: 3} 
  );

  console.log(response5);

  const response6 = await contract.tx.play(
    {account: contract_owner, transferAmount: transferAmount},{ room_id: "nignite", player_move: "O", position: 8} 
  );

  console.log(response6);

  const response7 = await contract.tx.play(
    {account: contract_owner, transferAmount: transferAmount},{ room_id: "nignite", player_move: "X", position: 5} 
  );

  console.log(response7);

  const responseQ2 = await contract.query.get_room({room_id:"nignite"});
  console.log(responseQ2);

  const response8 = await contract.tx.play(
    {account: contract_owner, transferAmount: transferAmount},{ room_id: "nignite", player_move: "O", position: 7} 
  );

  console.log(response8);

  const responseQ3 = await contract.query.get_room({room_id:"nignite"});
  console.log(responseQ3);

  
}

module.exports = { default: run };
