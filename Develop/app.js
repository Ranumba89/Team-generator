const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const personalInfo = async (empType) => {
    const ans = await inquirer.prompt([
        {
            message: `What is your ${empType} name`,
            name: "name",
        },
        {
            message: `What is your ${empType} id number?`,
            name: "id",
        },
        {
            message: `What is your ${empType} email ?`,
            name: "email",
        },
    ]);
    return ans;
}
const syncFunc = async () => {
    let empArray = [];
    const personalAns = await personalInfo("manager")
    const mangerAnswer = await inquirer.prompt([
        {
            message: "What is your managers office number ?",
            name: "officeNumber",
        },


    ]);
    
    const combineAnswer= {...mangerAnswer, ...personalAns}
    // console.log(combineArray);
    
    const manager = new Manager(
        combineAnswer.name, 
        combineAnswer.id, 
        combineAnswer.email, 
        combineAnswer.officeNumber
        )
    empArray.push(manager);

    const exitAnswer = "I dont want any more members";
    const internSelected = "Intern";
    const engineerSelected = "Engineer";
    while (true) {

        const empAnswer = await inquirer.prompt(
            {

                type: "list",
                message: "What type of team member do you want ",
                name: "empType",
                choices: [
                    engineerSelected,
                    internSelected,
                    exitAnswer
                ]
            }
        );

        console.log(empAnswer.empType);

        if (empAnswer.empType === exitAnswer) {
            break
        }
        if (empAnswer.empType === internSelected) {
            const personalAns = await personalInfo(internSelected)

            const ans = await inquirer.prompt([
                {

                    message: "What is your school",
                    name: "school",
                },

            ]);
            console.log(ans);
    const combineAnswer= {...ans, ...personalAns}
    const intern = new Intern(
        combineAnswer.name, 
        combineAnswer.id, 
        combineAnswer.email, 
        combineAnswer.school
        )
            empArray.push(intern);


        }
        if (empAnswer.empType === engineerSelected) {
    const personalAns = await personalInfo(engineerSelected)

            const ans = await inquirer.prompt([
                {
                    message: "What is your github",
                    name: "github",
                },
            ]);
            console.log(ans);
    const combineAnswer= {...ans, ...personalAns}
            const engineer = new Engineer(
                combineAnswer.name, 
                combineAnswer.id, 
                combineAnswer.email, 
                combineAnswer.github
                )
            empArray.push(engineer);

        }

    }

    const mainHtml = render(empArray);
    fs.writeFile("team.html", mainHtml, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
}
syncFunc()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
