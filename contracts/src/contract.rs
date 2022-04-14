use cosmwasm_std::{
    debug_print, to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier,
    StdError, StdResult, Storage,
};

use crate::msg::{HandleMsg, InitMsg, QueryMsg, StateResponse};
use crate::state::{config, config_read, GameResult, Move, State};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    let state = State {
        max_size: 8,
        count_move: 9,

        room_id: msg.room_id + 1,
        board: [None; 9],

        admin: deps.api.canonical_address(&env.message.sender)?,

        x_player: None,
        o_player: None,

        next_move: Move::X,

        result: GameResult::Playing,
    };

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
            player_move,
            position,
        } => try_play(deps, env, player_move, position),
    }
}

pub fn try_play<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    player_move: Move,
    position: i32,
) -> StdResult<HandleResponse> {
    let mut state = State::load(&deps.storage)?;

    if state.max_size < position || player_move != state.next_move || state.count_move == 0 {
        return Err(StdError::generic_err(""));
    }

    match state.next_move {
        Move::X => {
            if state.x_player.is_none() {
                state.x_player = Some(env.message.sender);
            }
        }

        Move::O => {
            if state.o_player.is_none() {
                state.o_player = Some(env.message.sender);
            }
        }
    }

    if state.board[position as usize].is_none() {
        state.board[position as usize] = Some(player_move);
    } else {
        return Err(StdError::generic_err(""));
    }

    let operations: [[i32; 2]; 4] = [[1, -1], [2, -2], [3, -3], [4, -4]];

    for op in operations.iter() {
        let mut line = 1;
        for direction in op.iter() {
            let mut current_pos = position + direction;

            while let Some(cell) = state.board.get(current_pos as usize) {
                if *cell == Some(player_move) {
                    line += 1;
                    current_pos += direction;
                }
            }
        }

        if line == 3 {
            match player_move {
                Move::X => state.result = GameResult::XWin,
                Move::O => state.result = GameResult::OWin,
            }

            state.count_move -= 1;

            return Ok(HandleResponse::default());
        }
    }

    state.count_move -= 1;
    if state.count_move == 0 && state.result == GameResult::Playing {
        state.result = GameResult::Draw;
    }

    debug_print("successfully");
    Ok(HandleResponse::default())
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetState {} => to_binary(&query_state(deps)?),
    }
}

fn query_state<S: Storage, A: Api, Q: Querier>(deps: &Extern<S, A, Q>) -> StdResult<StateResponse> {
    let state = config_read(&deps.storage).load()?;
    Ok(StateResponse {
        room_id: state.room_id,
        max_size: state.max_size,
        board: state.board,
        count_move: state.count_move,
        result: state.result,
    })
}

#[cfg(test)]
mod tests {
    // use super::*;
    // use cosmwasm_std::testing::{mock_dependencies, mock_env};
    // use cosmwasm_std::{coins, from_binary, StdError};

    // #[test]
    // fn proper_initialization() {
    //     let mut deps = mock_dependencies(20, &[]);

    //     let msg = InitMsg { count: 17 };
    //     let env = mock_env("creator", &coins(1000, "earth"));

    //     // we can just call .unwrap() to assert this was a success
    //     let res = init(&mut deps, env, msg).unwrap();
    //     assert_eq!(0, res.messages.len());

    //     // it worked, let's query the state
    //     let res = query(&deps, QueryMsg::GetCount {}).unwrap();
    //     let value: CountResponse = from_binary(&res).unwrap();
    //     assert_eq!(17, value.count);
    // }

    // #[test]
    // fn increment() {
    //     let mut deps = mock_dependencies(20, &coins(2, "token"));

    //     let msg = InitMsg { count: 17 };
    //     let env = mock_env("creator", &coins(2, "token"));
    //     let _res = init(&mut deps, env, msg).unwrap();

    //     // anyone can increment
    //     let env = mock_env("anyone", &coins(2, "token"));
    //     let msg = HandleMsg::Increment {};
    //     let _res = handle(&mut deps, env, msg).unwrap();

    //     // should increase counter by 1
    //     let res = query(&deps, QueryMsg::GetCount {}).unwrap();
    //     let value: CountResponse = from_binary(&res).unwrap();
    //     assert_eq!(18, value.count);
    // }

    // #[test]
    // fn reset() {
    //     let mut deps = mock_dependencies(20, &coins(2, "token"));

    //     let msg = InitMsg { count: 17 };
    //     let env = mock_env("creator", &coins(2, "token"));
    //     let _res = init(&mut deps, env, msg).unwrap();

    //     // not anyone can reset
    //     let unauth_env = mock_env("anyone", &coins(2, "token"));
    //     let msg = HandleMsg::Reset { count: 5 };
    //     let res = handle(&mut deps, unauth_env, msg);
    //     match res {
    //         Err(StdError::Unauthorized { .. }) => {}
    //         _ => panic!("Must return unauthorized error"),
    //     }

    //     // only the original creator can reset the counter
    //     let auth_env = mock_env("creator", &coins(2, "token"));
    //     let msg = HandleMsg::Reset { count: 5 };
    //     let _res = handle(&mut deps, auth_env, msg).unwrap();

    //     // should now be 5
    //     let res = query(&deps, QueryMsg::GetCount {}).unwrap();
    //     let value: CountResponse = from_binary(&res).unwrap();
    //     assert_eq!(5, value.count);
    // }
}
