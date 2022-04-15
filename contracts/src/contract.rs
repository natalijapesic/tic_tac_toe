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

    debug_print!("{:?}", state);

    if 8 < position || player_move != state.next_move || state.result != GameResult::Playing {
        return Err(StdError::generic_err("Ne odgovaraju uslovi"));
    }

    state.next_move = match state.next_move {
        Move::X => {
            if state.x_player.is_none() {
                state.x_player = Some(env.message.sender);
            }
            Move::O
        }

        Move::O => {
            if state.o_player.is_none() {
                state.o_player = Some(env.message.sender);
            }
            Move::X
        }
    };

    if state.board[position as usize].is_none() {
        state.board[position as usize] = Some(player_move);
    } else {
        return Err(StdError::generic_err("Nije inicijalizovano"));
    }

    //check row
    let mut line = check_line(position / 3 * 3, state.board.clone(), 0, player_move, 1);
    if line == 3 {
        state = set_result(player_move, state);

        state.save(&mut deps.storage)?;
        return Ok(HandleResponse::default());
    }

    //check column
    line = check_line(position % 3, state.board.clone(), 0, player_move, 3);
    if line == 3 {
        state = set_result(player_move, state);
    }

    state.count_move -= 1;
    if state.count_move == 0 && state.result == GameResult::Playing {
        state.result = GameResult::Draw;
    }

    debug_print("successfully");
    state.save(&mut deps.storage)?;
    Ok(HandleResponse::default())
}

pub fn check_line(
    mut start: i32,
    board: [Option<Move>; 9],
    mut line: i32,
    player_move: Move,
    increment: i32,
) -> i32 {
    while let Some(cell) = board.get((start) as usize) {
        if *cell == Some(player_move) && line < 3 {
            line += 1;
            start += increment;
        } else {
            return line;
        }
    }

    line
}

pub fn set_result(player_move: Move, mut state: State) -> State {
    match player_move {
        Move::X => state.result = GameResult::XWin,
        Move::O => state.result = GameResult::OWin,
    }

    state.count_move -= 1;

    state
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
        board: state.board,
        count_move: state.count_move,
        result: state.result,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies(20, &[]);

        let msg = InitMsg { room_id: 17 };
        let env = mock_env("creator", &coins(1000, "earth"));

        // we can just call .unwrap() to assert this was a success
        let res = init(&mut deps, env, msg).unwrap();
        assert_eq!(0, res.messages.len());

        // it worked, let's query the state
        let res = query(&deps, QueryMsg::GetState {}).unwrap();
        let value: StateResponse = from_binary(&res).unwrap();
        assert_eq!(18, value.room_id);
    }

    #[test]
    fn play() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg { room_id: 17 };
        let env = mock_env("creator", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        // anyone can increment
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Play {
            player_move: Move::X,
            position: 4,
        };
        let _res = handle(&mut deps, env, msg).unwrap();

        let res = query(&deps, QueryMsg::GetState {}).unwrap();
        let response: StateResponse = from_binary(&res).unwrap();
        let expected_response = StateResponse {
            room_id: 17,
            board: [
                None,
                None,
                None,
                Some(Move::X),
                None,
                None,
                None,
                None,
                None,
            ],
            count_move: 8,
            result: GameResult::Playing,
        };
        assert_eq!(expected_response, response);
    }
}
