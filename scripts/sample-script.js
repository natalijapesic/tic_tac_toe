const { Contract, getAccountByName } = require("secret-polar");

async function run() {
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

  const contract_info = await contract.instantiate({}, `${Date.now()}/deploy test`, contract_owner);
  console.log(contract_info);

  console.log(await contract.query.count_room({}))


  const create_room1 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite1", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  console.log(create_room1)
  // const create_room2 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite2", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  // const create_room3 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite3", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  // const create_room4 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite4", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  // const create_room5 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite5", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  // const create_room6 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite6", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  // const create_room7 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite7", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  // const create_room8 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite8", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  // const create_room9 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite9", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });
  // const create_room10 = await contract.tx.create_room({ account: contract_owner }, { name: "nignite10", x_player: "secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz", o_player: "secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2" });

  // const response = await contract.query.room({room_id: 1});
  // console.log(response);

  // const page1 = await contract.query.rooms({items_per_page: 2, page_number: 0});
  // console.log(page1)

  // const page2 = await contract.query.rooms({items_per_page: 2, page_number: 3});
  // console.log(page2)

  // const transferAmount = [{"denom": "uscrt", "amount": "15000000"}] // 15 SCRT
  // const customFees = { // custom fees
  //   amount: [{ amount: "750000", denom: "uscrt" }],
  //   gas: "3000000",
  // }

  // const response1 = await contract.tx.play(
  //   {account: contract_owner, transferAmount: transferAmount},{ room_id: 1, player_move: "X", position: 2} 
  // );

  // console.log(response1);

  // const response2 = await contract.tx.play(
  //   {account: contract_owner, transferAmount: transferAmount},{ room_id: 1, player_move: "O", position: 1} 
  // );

  // console.log(response2);

  // const response3 = await contract.tx.play(
  //   {account: contract_owner, transferAmount: transferAmount},{ room_id: 1, player_move: "X", position: 4} 
  // );

  // console.log(response3);
  // const response4 = await contract.tx.play(
  //   {account: contract_owner, transferAmount: transferAmount},{ room_id: 1, player_move: "O", position: 6} 
  // );

  // console.log(response4);

  // const responseQ = await contract.query.room({room_id: 1});
  // console.log(responseQ);

  // const response5 = await contract.tx.play(
  //   {account: contract_owner, transferAmount: transferAmount},{ room_id: 1, player_move: "X", position: 3} 
  // );

  // console.log(response5);

  // const response6 = await contract.tx.play(
  //   {account: contract_owner, transferAmount: transferAmount},{ room_id: 1, player_move: "O", position: 8} 
  // );

  // console.log(response6);

  // const response7 = await contract.tx.play(
  //   {account: contract_owner, transferAmount: transferAmount},{ room_id: 1, player_move: "X", position: 5} 
  // );

  // console.log(response7);

  // const responseQ2 = await contract.query.room({room_id: 1});
  // console.log(responseQ2);

  // const response8 = await contract.tx.play(
  //   {account: contract_owner, transferAmount: transferAmount},{ room_id: 1, player_move: "O", position: 7} 
  // );

  // console.log(response8);

  // const responseQ3 = await contract.query.room({room_id: 1});
  // console.log(responseQ3);


}

module.exports = { default: run };
