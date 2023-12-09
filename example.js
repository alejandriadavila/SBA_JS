// The provided course information.
const courseInfo = {
  courseId: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const assignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  courseId: 451,
  groupWeight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      dueAt: "2023-01-25",
      pointsPossible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      dueAt: "2023-02-27",
      pointsPossible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      dueAt: "3156-11-15",
      pointsPossible: 500,
    },
  ],
};

// The provided learner submission data.
const learnerSubmissions = [
  {
    learnerId: 125,
    assignmentId: 1,
    submission: {
      submittedAt: "2023-01-25",
      score: 47,
    },
  },
  {
    learnerId: 125,
    assignmentId: 2,
    submission: {
      submittedAt: "2023-02-12",
      score: 150,
    },
  },
  {
    learnerId: 125,
    assignmentId: 3,
    submission: {
      submittedAt: "2023-01-25",
      score: 400,
    },
  },
  {
    learnerId: 132,
    assignmentId: 1,
    submission: {
      submittedAt: "2023-01-24",
      score: 39,
    },
  },
  {
    learnerId: 132,
    assignmentId: 2,
    submission: {
      submittedAt: "2023-03-07",
      score: 140,
    },
  },
];

try {
  function getLearnerData(course, ag, submissions) {
    let result = [];
    let learnerObj = {};
    let totalPossiblePoints = 0;
    let totalPointsEarned = 0;

    // Check that courseid matches from course & ag
    if (course.courseId === ag.courseId) {
      // Divide submissions by learnerId
      // Followed documentation for object.values() found here: https://www.geeksforgeeks.org/how-to-group-objects-in-an-array-based-on-a-common-property-into-an-array-of-arrays-in-javascript/
      const groupByLearnerId = Object.values(
        submissions.reduce((group, current) => {
          group[current.learnerId] = group[current.learnerId] ?? [];
          group[current.learnerId].push(current);
          return group;
        }, {})
      );

      // Change the date formatting to match the formatting of the provided information
      const YMDdate = (function convertformat() {
        let DMYdate = new Date();
        let YMDdate =
          DMYdate.getFullYear() +
          "-" +
          (DMYdate.getMonth() + 1) +
          "-" +
          DMYdate.getDate() +
          " ";
        return YMDdate;
      })();

      // for each item in array groupbyLearnerId
      for (const i in groupByLearnerId) {
        // Create the learner id for learnerObj
        learnerObj = {};
        learnerObj.id = groupByLearnerId[i][0].learnerId;
        // for each object in array[i]
        for (const j in groupByLearnerId[i]) {
          // for each object in assignment group.assignments
          for (const k in ag.assignments) {
            // Has the due date passed?
            if (ag.assignments[k].dueAt < YMDdate) {
              // Do the assignment Id's match?
              if (groupByLearnerId[i][j].assignmentId === ag.assignments[k].id) {
                if ((ag.assignments[k].pointsPossible === 0)) {
                  throw `Error: Assignment ${ag.assignments[k].pointsPossible} = 0`;
                } else {
                  // if yes,add it to grade
                  learnerObj[groupByLearnerId[i][j].assignmentId] =
                    groupByLearnerId[i][j].submission.score /
                    ag.assignments[k].pointsPossible;
                  if (
                    ag.assignments[k].dueAt <
                    groupByLearnerId[i][j].submission.submittedAt
                  ) {
                    learnerObj[groupByLearnerId[i][j].assignmentId] =
                      groupByLearnerId[i][j].submission.score /
                        ag.assignments[k].pointsPossible -
                      0.1;
                  }
                }
                //Calculate the average score
                totalPossiblePoints =
                  totalPossiblePoints + ag.assignments[k].pointsPossible;
                totalPointsEarned =
                  totalPointsEarned +
                  learnerObj[groupByLearnerId[i][j].assignmentId] * 100;
              }else {
                continue;
              }
            } else {
              continue;
            }
          }
        }
        learnerObj.avg = totalPointsEarned / totalPossiblePoints;
        result.push(learnerObj);
      }
      console.log(result);
    } else {
      throw "Error: Course Id's do not match";
    }
  }
} catch {}
getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
