/**
 * Combine Reducers Redux Data
 */
 import { combineReducers } from 'redux';
import User from './UserReducer';
import Poject from './ProjectReducer';
import Department from './DepartmentReducer';
import Auth from './AuthReducer';

 
 const rootReducer = combineReducers({
  user:User,
  project:Poject,
  department:Department,
  auth:Auth
 });
 
 
 export default   rootReducer
   