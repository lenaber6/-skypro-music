import { fetchTokens, fetchUser } from "@/api/user";
import { SigninFormType, userType } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserStateType =  { // Тип среза состояния
   user: null | userType;
   tokens: {
    access: string | null;
    refresh: string | null;
   } 
  }
  
  const initialState: UserStateType = { // мы определяем начальное состояние initialState
   user: null,  // в котором userState указывает на статус аутентификации пользователя.
   tokens: {
    access: null,
    refresh:  null,
   } 
  };
  
export const getUser = createAsyncThunk(
    "user/getUser",
    async({email, password}: SigninFormType) => {
const user = await fetchUser({email, password});
return user;
    }
);
export const getTokens = createAsyncThunk(
    "user/getTokens",
    async({email, password}: SigninFormType) => {
const tokens = await fetchTokens({email, password});
return tokens;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      // выход из приложения
      logout: (state) => {
        state.user = null;
        state.tokens.access = null;
        state.tokens.refresh = null;
      },
    },
    extraReducers: (builder) => {
      // Обрабатываем экшены, связанные с нашим асинхронным thunk
      builder
        // Обработка успешного выполнения асинхронного экшена getUser
        .addCase(getUser.fulfilled, (state, action: PayloadAction<userType>) => {
          state.user = action.payload; // Обновляем состояние пользователя данными из action.payload
        })
        // Обработка неудачного выполнения асинхронного экшена getUser
        .addCase(getUser.rejected, (state, action) => {
          console.error('Error:', action.error.message); // Выводим сообщение об ошибке в консоль
        })
        .addCase(getTokens.fulfilled, (state, action: PayloadAction<{
            access: string | null; 
            refresh: string | null;
        }>) => {
            state.tokens.access = action.payload.access; 
            state.tokens.refresh = action.payload.refresh; 
            
          })
          // Обработка неудачного выполнения асинхронного экшена getUser
          .addCase(getTokens.rejected, (state, action) => {
            console.error('Error:', action.error.message); // Выводим сообщение об ошибке в консоль
          });
    },
  });

  export const {logout, } = userSlice.actions;
export const userReducer = userSlice.reducer;