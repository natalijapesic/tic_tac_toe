use cosmwasm_std::{StdError, HandleResponse};

pub enum CustomError {
    Position,
    RoomState,
    CurrentPlayer,
    InitPosition,
}

impl CustomError {
    pub fn message(self) -> Result<HandleResponse, StdError> {
        match self {
            CustomError::CurrentPlayer => Err(StdError::generic_err("The player hasnt right to play")),
            CustomError::Position => Err(StdError::generic_err("Position out of bounds")),
            CustomError::RoomState => Err(StdError::generic_err("Game is over")),
            CustomError::InitPosition => Err(StdError::generic_err("Position has already been initialized")),
        }
    }
}
