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
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.saveHistory = this.saveHistory.bind(this);

    this.state = {
      questions: [],
      answer_id: [],
      user_id: 0,
    };
  }

  componentDidMount() {
    this.retrieveQuestion();
    this.getUserID();
  }

  onChangeAnswer(e) {
    this.setState({
      answer_id: this.state.answer_id.concat([e.target.value]),
    });
  }

  retrieveQuestion() {
    QuestionService.getAll()
      .then((response) => {
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
 
    if (user) {
      this.setState({
        user_id: user.user_id,
      });
    }
  }

  saveHistory() {
    QuestionService.saveHistory(this.state.answer_id, this.state.user_id)
      .then((response) => {
        this.props.history.push("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  render() {
    const { questions } = this.state;

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
                      </div>
                      </p>
                      <div>
                        {question.question_value}
                      </div>
                      <select className="form-control" onChange={this.onChangeAnswer}>
                        <option>Pilih Jawaban</option>
                        { question.answers_list && question.answers_list.map(answer => (
                        <option value={answer.answer_id}>{answer.answer_value}</option>
                        ))}
                      </select>
                    </p>
                  ))}
                    <button
                      onClick={this.saveHistory}
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
