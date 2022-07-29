import React, { Component } from "react";
import QuestionService from "../../../services/question.service";
import AuthService from "../../../services/auth.service";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListQuestions extends Component {
  constructor(props) {
    super(props);
    this.retrieveQuestion = this.retrieveQuestion.bind(this);
    this.getUserID = this.getUserID.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.saveHistory = this.saveHistory.bind(this);
    this.saveHistoryV2 = this.saveHistoryV2.bind(this);

    this.state = {
      questions: [],
      category_id: 0,
      question_id: 0,
      answer_id: 0,
      user_id: 0,
    };
  }

  componentDidMount() {
    this.retrieveQuestion();
    this.getUserID();
  }

  onChangeCategory(e) {
    this.setState({
      category_id: e.target.value,
    });
  }

  onChangeQuestion(e) {
    this.setState({
      question_id: e.target.value,
    });
  }

  onChangeAnswer(e) {
    this.setState({
      answer_id: e.target.value,
    });
  }

  onChangeUser(e) {
    this.setState({
      user_id: e.target.value,
    });
  }

  retrieveQuestion() {
    QuestionService.getAll()
      .then((response) => {
        console.log("ress:: ",response);
        this.setState({
          questions: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getUserID() {
    const user = AuthService.getCurrentUserID();
    console.log("USERIDNIH::",user);

    if (user) {
      this.setState({
        user_id: user.user_id,
      });
    }
  }

  saveHistory() {
    QuestionService.saveHistory(this.state.category_id, this.state.question_id, this.state.answer_id, this.state.user_id)
      .then((response) => {
        this.props.history.push("/questions");
        window.location.reload();
       })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  saveHistoryV2() {
    QuestionService.saveHistoryV2(this.state.answer_id, this.state.user_id)
      .then((response) => {
/*         this.props.history.push("/questions");
        window.location.reload();
 */       })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  render() {
    const { questions } = this.state;
    const { user_id } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-sm-9">
                        <h3 className="card-title ">Daftar Pertanyaan</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                  {questions.map((question, index) => (
                    <p data-index={index}>
                      <p>{index+1}. 
                      <div>
                        <b>{question.category_value}</b>
                        <input
                        hidden
                        type="text"
                        className="form-control"
                        id="category_id"
                        required
                        value={question.category_id}
                        onChange={this.onChangeCategory}
                        name="category_id"
                        />
                      </div>
                      </p>
                      <div>
                        {question.question_value}
                        <input
                        hidden
                        type="text"
                        className="form-control"
                        id="question_id"
                        required
                        value={question.question_id}
                        onChange={this.onChangeQuestion}
                        name="question_id"
                        />
                      </div>
                      <select className="form-control" onChange={this.onChangeAnswer}>
                        <option>Pilih Jawaban</option>
                        { question.answers_list && question.answers_list.map(answer => (
                        <option value={answer.answer_id}>{answer.answer_value}</option>
                        ))}
                      </select>
                      <div>
                        <input
                        hidden
                        type="text"
                        className="form-control"
                        id="user_id"
                        required
                        value={user_id}
                        name="user_id"
                        />
                      </div>
                    </p>
                  ))}
                    <button
                      onClick={this.saveHistoryV2}
                      className="btn btn-block btn-success btn-sm"
                    >
                      Submit
                    </button>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
