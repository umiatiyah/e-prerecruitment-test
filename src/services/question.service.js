import http from "../http-common";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class QuestionService {
  getAll() {
    return http.get(API_URL+`/user/question`, { headers: authHeader() });
  }

  saveHistoryOld(category_id, question_id, answer_id, user_id) {
    return axios.post(API_URL+`/user/history`, {
      data: [
        {
          category_id: parseInt(category_id),
          question_id: parseInt(question_id),
          answer_id: parseInt(answer_id),
          user_id: parseInt(user_id),
        }
      ]
    },
    { 
      headers: authHeader() 
    });
  }

  saveHistory(answer_id, user_id) {
    let item = []
    answer_id.forEach((obj)=>{
      item.push({
        answer_id: parseInt(obj),
        user_id: parseInt(user_id) 

      })
    })
    const res = JSON.stringify(item)

    return axios.post(API_URL+`/user/historyV2`, {
      data: JSON.parse(res)
    },
    { 
      headers: authHeader() 
    });
  }
}

export default new QuestionService();
