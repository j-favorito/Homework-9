const fs = require("fs");
const ax = require("axios");
const iq = require("inquirer");

const questions = ["Github username: ", "Project name: ", "Description of project: ", "Installation requirements: ", "Usage: ", "License: ", "Tests: ","Contributors: ","Github Email: "
];
const prompts = []

function prompt(question) {
  for (let i = 0; i < questions.length; i++) {
    prompts[i] = {
      name: "question" + i,
      message: question[i]
    }
  }
}

prompt(questions);

let userName="John Doe";

async function readmeField() {

  await iq
    .prompt(prompts[0])
    .then(function (ans) {
      userName=ans.question0;
      const queryUrl = `https://api.github.com/users/${ans.question0}/repos?per_page=100`;

      ax
        .get(queryUrl)
        .then(res => {
          const pJSON = res.data;
          // console.log(res)
          // const pName=pJSON.filter(project>project.name);
          const pAv=JSON.stringify(res.data[0].owner.avatar_url);
          fs.appendFile("README.md",`![Profile Avatar](${pAv})`, function (err) {
            if (err) throw err
          })
        })
        .catch(err => {
          console.log(err)
        })
    })

  await iq
    .prompt(prompts[1])
    .then(function (ans) {
      fs.appendFile("README.md", `# ${ans.question1} \n`, function (err) {
        if (err) throw err
      })
    });


  await iq
    .prompt(prompts[2])
    .then(function (ans) {
      fs.appendFile("README.md", `### Description: \n ${ans.question2} \n`, function (err) {
        if (err) throw err
      })
    });

  await iq
    .prompt(prompts[3])
    .then(function (ans) {
      fs.appendFile("README.md", `### Instalation requirements: \n ${ans.question3} \n`, function (err) {
        if (err) throw err
      })
    });

  await iq
    .prompt(prompts[4])
    .then(function (ans) {
      fs.appendFile("README.md", `### Usage: \n ${ans.question4} \n`, function (err) {
        if (err) throw err
      })
    });

  await iq
    .prompt(prompts[5])
    .then(function (ans) {
      fs.appendFile("README.md", `### License: \n ${ans.question5} \n`, function (err) {
        if (err) throw err
      })
    });


  await iq
    .prompt(prompts[6])
    .then(function (ans) {
      fs.appendFile("README.md", `### Tests: \n ${ans.question6} \n`, function (err) {
        if (err) throw err
      })
    });

    await iq
    .prompt(prompts[7])
    .then(function (ans) {
      fs.appendFile("README.md", `### Contributors: \n ${ans.question7} \n`, function (err) {
        if (err) throw err
      })
    });

    await iq
    .prompt(prompts[8])
    .then(function (ans) {
      fs.appendFile("README.md", `### Github Email: \n ${ans.question8} \n`, function (err) {
        if (err) throw err
      })
    });

    await fs.appendFile("README.md", `### Github Username: \n ${userName} \n`,function (err){
      if(err)throw err
    })



}





readmeField();
