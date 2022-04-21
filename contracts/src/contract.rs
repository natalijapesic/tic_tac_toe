use cosmwasm_std::{
    to_binary, Api, Binary, Env, Extern, HandleResponse, HumanAddr, InitResponse, Querier,
    StdResult, Storage,
};

use crate::custom_error::CustomError;
use crate::msg::{CountRoomResponse, HandleMsg, InitMsg, QueryMsg};
use crate::room::{GameResult, Move, Room, GameState};
use crate::state::{config, config_read, State};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    let state = State::new(
        msg.count_room,
        deps.api.canonical_address(&env.message.sender)?,
    );

    config(&mut deps.storage).save(&state)?;

    Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::Play {
            room_id,
            player_move,
            position,
        } => try_play(deps, env, room_id, player_move, position),

        HandleMsg::CreateRoom {
            name,
            x_player,
            o_player,
        } => try_create_room(deps, env, name, x_player, o_player),
    }
}

pub fn try_increment<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
) -> StdResult<u16> {
    let state = config(&mut deps.storage).update(|mut state| {
        state.count_room += 1;

        Ok(state)
    })?;

    Ok(state.count_room)
}

pub fn try_create_room<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    name: String,
    x_player: HumanAddr,
    o_player: HumanAddr,
) -> StdResult<HandleResponse> {

    let room_id = query_count_room(deps)?;

    let room = Room::new(room_id.count_room, name, x_player, o_player);

    room.save(&mut deps.storage)?;

    try_increment(deps, env)?;

    return Ok(HandleResponse::default());
}

pub fn try_play<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    room_id: u16,
    player_move: Move,
    position: u8,
) -> StdResult<HandleResponse> {
    if position > 8 {
        return CustomError::Position.message();
    }

    let mut room = Room::load(room_id, &deps.storage).expect("Room is not loaded");

    room.validate(&env.message.sender, position)?;

    room.current_player = if player_move == Move::O {
        room.x_player.clone()
    } else {
        room.o_player.clone()
    };

    room.board[position as usize] = Some(player_move);

    let result = room
        .check_winner(position, &player_move, &mut deps.storage)
        .expect("Room is not saved");

    if result {
        return Ok(HandleResponse::default());
    }

    room.count_move -= 1;
    if room.count_move == 0 {
        room.result = Some(GameResult::Draw);
        room.state = GameState::GameOver;
    }

    room.save(&mut deps.storage)?;

    Ok(HandleResponse::default())
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::Room { room_id } => to_binary(&query_room(deps, room_id)?),
        QueryMsg::CountRoom {} => to_binary(&query_count_room(deps)?),
        QueryMsg::Page { items_per_page, page_number } => to_binary(&query_page(deps, items_per_page, page_number)?),
    }
}

fn query_room<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    room_id: u16,
) -> StdResult<Room> {
    let room = Room::load(room_id, &deps.storage)?;

    Ok(room)
}

fn query_page<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    items_per_page: u16,
    page_number: u16,
) -> StdResult<Vec<Room>> {

    let mut state = config_read(&deps.storage).load()?;
    let rooms = state.load_page(items_per_page, page_number, &deps.storage)?;

    Ok(rooms)
}

fn query_count_room<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
) -> StdResult<CountRoomResponse> {
    let state = config_read(&deps.storage).load()?;
    Ok(CountRoomResponse {
        count_room: state.count_room,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary};

    // fn init_room() -> Extern<
    //     cosmwasm_std::MemoryStorage,
    //     cosmwasm_std::testing::MockApi,
    //     cosmwasm_std::testing::MockQuerier,
    // > {
    //     let mut deps = mock_dependencies(20, &[]);
    //     let msg = InitMsg {};
    //     let env = mock_env("albis", &coins(2, "token"));
    //     let _res = init(&mut deps, env, msg).unwrap();

    //     let env = mock_env("anyone", &coins(2, "token"));
    //     let msg = HandleMsg::CreateRoom {
    //         room_id: "tuturu".to_string(),
    //         x_player: HumanAddr::from("albis"),
    //         o_player: HumanAddr::from("balbis"),
    //     };
    //     let _res = handle(&mut deps, env, msg).unwrap();

    //     deps
    // }
    // #[test]
    // fn create_room() {
    //     let deps = init_room();

    //     let res = query(
    //         &deps,
    //         QueryMsg::GetRoom {
    //             room_id: "tuturu".to_string(),
    //         },
    //     )
    //     .unwrap();

    //     let response: RoomResponse = from_binary(&res).unwrap();
    //     let expected_response = RoomResponse {
    //         id: "tuturu".to_string(),
    //         board: [None; 9],
    //         count_move: 9,
    //         result: GameResult::Playing,
    //         next_move: Move::X,
    //         x_player: HumanAddr::from("albis"),
    //         o_player: HumanAddr::from("balbis"),
    //     };
    //     assert_eq!(expected_response, response);
    // }

    // #[test]
    // fn play() {
    //     let mut deps = init_room();

    //     let env = mock_env("anyone", &coins(2, "token"));
    //     let msg = HandleMsg::Play {
    //         room_id: "tuturu".to_string(),
    //         player_move: Move::X,
    //         position: 4,
    //     };

    //     let _res = handle(&mut deps, env, msg).unwrap();

    //     let res = query(
    //         &deps,
    //         QueryMsg::GetRoom {
    //             room_id: "tuturu".to_string(),
    //         },
    //     )
    //     .unwrap();

    //     let response: RoomResponse = from_binary(&res).unwrap();
    //     let expected_response = RoomResponse {
    //         id: "tuturu".to_string(),
    //         board: [
    //             None,
    //             None,
    //             None,
    //             None,
    //             Some(Move::X),
    //             None,
    //             None,
    //             None,
    //             None,
    //         ],
    //         count_move: 8,
    //         result: GameResult::Playing,
    //         next_move: Move::O,
    //         x_player: HumanAddr::from("albis"),
    //         o_player: HumanAddr::from("balbis"),
    //     };
    //     assert_eq!(expected_response, response);
    // }
}
