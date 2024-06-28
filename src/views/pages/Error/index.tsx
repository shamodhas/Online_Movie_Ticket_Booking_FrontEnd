import React, { Component } from "react";

export default class NotFound extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        404 Not Found
      </div>
    );
  }
}

// const handleSubmit = async () => {
//   const { q1, q2, q3, q4 } = answers

//   if (q1 === null || q2 === null || q3 === null || q4 === null) {
//     notifyWarning("Please answer all the questions.")
//   } else if (!isAgree) {
//     notifyWarning("You must agree to the terms and privacy policy.")
//   } else {
//     dispatch(setLoading(true))
//     await saveOnboardingQuestion({
//       userDetailId: user.userId,
//       onboardingQuestionDtoList: questions.map((question, index) => ({
//         question: question.questionTitle,
//         answer: answers[`q${index + 1}`]
//       }))
//     })
//       .then((res) => {
//         if (res.success) {
//           const updateUser = { ...user, isFirstTimeSignIn: false }
//           dispatch(setUserData(updateUser))
//           Cookies.set(constant.USER_DATA, JSON.stringify(updateUser))
//           localStorage.setItem(constant.USER_DATA, JSON.stringify(updateUser))

//           navigate("/welcome")
//         } else if (res.status === 0) {
//           notifyWarning("Invalid answers")
//         } else {
//           notifyError(
//             "Connection refused: Unable to connect to the server. Please check your internet connection or try again later."
//           )
//         }
//       })
//       .finally(() => {
//         dispatch(setLoading(false))
//       })
//   }
// }


  // const getDataHandler = async () => {
  //   dispatch(setLoading(true))
  //   if (pageType === HOME_ADS) {
  //     await getHomeAds()
  //       .then((res) => {
  //         if (res.success) {
  //           setData(res?.result ?? [])
  //         } else if (res.result) {
  //           toast.error(res.result)
  //         } else {
  //           toast.error("Somthing wrong")
  //         }
  //       })
  //       .finally(() => {
  //         dispatch(setLoading(false))
  //       })
  //   } else if (pageType === ALL_ADS) {
  //     await getSiteAds()
  //       .then((res) => {
  //         if (res.success) {
  //           setData(res?.result ?? [])
  //         } else if (res.result) {
  //           toast.error(res.result)
  //         } else {
  //           toast.error("Somthing wrong")
  //         }
  //       })
  //       .finally(() => {
  //         dispatch(setLoading(false))
  //       })
  //   }
  // }

  // useEffect(() => {
  //   getDataHandler()
  // }, [])