use cosmwasm_std::{
    debug_print, to_binary, Api, Binary, Env, Extern, HandleResponse, HumanAddr, InitResponse,
    Querier, StdError, StdResult, Storage,
};

use cosmwasm_storage::{prefixed, prefixed_read, typed, typed_read};

use crate::msg::{HandleMsg, InitMsg, QueryMsg, RoomResponse};
use crate::room::{GameResult, Move, Room};
use crate::state::{config, State};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    let state = State::new(
        msg.count_rooms,
        deps.api.canonical_address(&env.message.sender)?,
    );

    config(&mut deps.storage).save(&state)?;

    debug_print!("Contract was initialized by {}", env.message.sender);

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

pub fn try_create_room<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
    name: String,
    x_player: HumanAddr,
    o_player: HumanAddr,
) -> StdResult<HandleResponse> {
    let mut space = prefixed(b"room", &mut deps.storage);
    let mut bucket = typed::<_, Room>(&mut space);

    //incerement count_room in state

    let room = Room::new(2, name, x_player, o_player);

    bucket.save(room_id.as_bytes(), &room).unwrap();
    return Ok(HandleResponse::default());
}

pub fn try_play<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    room_id: String,
    player_move: Move,
    position: u8,
) -> StdResult<HandleResponse> {
    if position > 8 {
        return Err(StdError::generic_err("Conditions not met"));
    }

    let mut space = prefixed(b"room", &mut deps.storage);
    let mut bucket = typed::<_, Room>(&mut space);
    let mut room = bucket.load(room_id.as_bytes()).expect("load room");

    if player_move != room.next_move || room.result != GameResult::Playing {
        return Err(StdError::generic_err("Conditions not met"));
    }

    room.next_move = match room.next_move {
        Move::X => {
            // if room.x_player != env.message.sender {
            //     return Err(StdError::generic_err("Conditions not met"));
            // }

            Move::O
        }

        Move::O => {
            // if room.o_player != env.message.sender {
            //     return Err(StdError::generic_err("Conditions not met"));
            // }

            Move::X
        }
    };

    if room.board[position as usize].is_none() {
        room.board[position as usize] = Some(player_move);
    } else {
        return Err(StdError::generic_err("Not initialized"));
    }

    //check row
    if room.check_line(position / 3 * 3, 0, player_move, 1) {
        bucket.save(room_id.as_bytes(), &room).unwrap();
        return Ok(HandleResponse::default());
    }

    //check column
    if room.check_line(position % 3, 0, player_move, 3) {
        bucket.save(room_id.as_bytes(), &room).unwrap();
        return Ok(HandleResponse::default());
    }

    //check diagonals
    if position % 2 == 0 {
        if position != 2 && position != 6 {
            if room.check_line(0, 0, player_move, 4) {
                bucket.save(room_id.as_bytes(), &room).unwrap();
                return Ok(HandleResponse::default());
            }
        }

        if position != 0 && position != 8 {
            if room.check_line(2, 0, player_move, 2) {
                bucket.save(room_id.as_bytes(), &room).unwrap();
                return Ok(HandleResponse::default());
            }
        }
    }

    room.count_move -= 1;
    if room.count_move == 0 {
        room.result = GameResult::Draw;
    }

    bucket.save(room_id.as_bytes(), &room).unwrap();

    Ok(HandleResponse::default())
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetRoom { room_id } => to_binary(&query_room(deps, room_id)?),
    }
}

fn query_room<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    room_id: String,
) -> StdResult<RoomResponse> {
    let space = prefixed_read(b"room", &deps.storage);
    let bucket = typed_read::<_, Room>(&space);

    let room = bucket.load(room_id.as_bytes()).unwrap();

    Ok(RoomResponse {
        id: room.id,
        next_move: room.next_move,
        board: room.board,
        count_move: room.count_move,
        result: room.result,
        x_player: room.x_player,
        o_player: room.o_player,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary};

    fn init_room() -> Extern<
        cosmwasm_std::MemoryStorage,
        cosmwasm_std::testing::MockApi,
        cosmwasm_std::testing::MockQuerier,
    > {
        let mut deps = mock_dependencies(20, &[]);
        let msg = InitMsg {};
        let env = mock_env("albis", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::CreateRoom {
            room_id: "tuturu".to_string(),
            x_player: HumanAddr::from("albis"),
            o_player: HumanAddr::from("balbis"),
        };
        let _res = handle(&mut deps, env, msg).unwrap();

        deps
    }
    #[test]
    fn create_room() {
        let deps = init_room();

        let res = query(
            &deps,
            QueryMsg::GetRoom {
                room_id: "tuturu".to_string(),
            },
        )
        .unwrap();

        let response: RoomResponse = from_binary(&res).unwrap();
        let expected_response = RoomResponse {
            id: "tuturu".to_string(),
            board: [None; 9],
            count_move: 9,
            result: GameResult::Playing,
            next_move: Move::X,
            x_player: HumanAddr::from("albis"),
            o_player: HumanAddr::from("balbis"),
        };
        assert_eq!(expected_response, response);
    }

    #[test]
    fn play() {
        let mut deps = init_room();

        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Play {
            room_id: "tuturu".to_string(),
            player_move: Move::X,
            position: 4,
        };

        let _res = handle(&mut deps, env, msg).unwrap();

        let res = query(
            &deps,
            QueryMsg::GetRoom {
                room_id: "tuturu".to_string(),
            },
        )
        .unwrap();

        let response: RoomResponse = from_binary(&res).unwrap();
        let expected_response = RoomResponse {
            id: "tuturu".to_string(),
            board: [
                None,
                None,
                None,
                None,
                Some(Move::X),
                None,
                None,
                None,
                None,
            ],
            count_move: 8,
            result: GameResult::Playing,
            next_move: Move::O,
            x_player: HumanAddr::from("albis"),
            o_player: HumanAddr::from("balbis"),
        };
        assert_eq!(expected_response, response);
    }
}
