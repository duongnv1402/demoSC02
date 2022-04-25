import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import Fitness from '@ovalmoney/react-native-fitness';

const App = () => {
  const permissions = [
    {
      kind: Fitness.PermissionKinds.Steps,
      access: Fitness.PermissionAccesses.Read
    },
    {
      kind: Fitness.PermissionKinds.Distances,
      access: Fitness.PermissionAccesses.Read
    },
    {
      kind: Fitness.PermissionKinds.Calories,
      access: Fitness.PermissionAccesses.Read
    },
    {
      kind: Fitness.PermissionKinds.HeartRate,
      access: Fitness.PermissionAccesses.Read
    },
    {
      kind: Fitness.PermissionKinds.Activity,
      access: Fitness.PermissionAccesses.Read
    },
    {
      kind: Fitness.PermissionKinds.SleepAnalysis,
      access: Fitness.PermissionAccesses.Read
    },
  ];

  const [isLogin, setIsLogin] = React.useState(false)
  const [txt, setTxt] = React.useState("-")
  const [steps, setSteps] = React.useState([])
  const [distances, setDistances] = React.useState([])
  const [calories, setCalories] = React.useState([])
  const [heartRates, setHeartRate] = React.useState([])
  // const [steps, setSteps] = React.useState([])

  const checkLogin = async () => {
    await Fitness.isAuthorized(permissions).then(data => {
      setIsLogin(data);
      // console.log(data);
    });
  }

  const login = async () => {
    await Fitness.requestPermissions(permissions).then(data => {
      console.log(data);
    })
  }

  useEffect(()=>{
    checkLogin();
    console.log(isLogin);
    if (isLogin === true) {
      console.log("Login ")
    // if already authorized, fetch data
    } else {
      login();
    }
  }, [])

  const getFitness = async () => {
    await Fitness.getSteps({ startDate:"2022-04-21", endDate: "2022-04-30", interval: 'days' })
    .then((data) => {
      setSteps(data)
    });
    
    await Fitness.getDistances({ startDate:"2022-04-21", endDate: "2022-04-30", interval: 'days' })
    .then((data) => {
      // console.log(data)
      setDistances(data)
    });
    
    await Fitness.getCalories({ startDate:"2022-04-21", endDate: "2022-04-30", interval: 'days' })
    .then((data) => {
      // console.log(data)
      setCalories(data)
    });
    
    // await Fitness.getHeartRate({ startDate:"2022-04-21", endDate: "2022-04-30", interval: 'days' })
    // .then((data) => {
    //   // console.log(data)
    //   setHeartRate(data)
    // });
    
    // await Fitness.getSleepAnalysis({ startDate:"2022-04-21", endDate: "2022-04-30"})
    // .then((data) => {
    //   console.log(data)
    //   setHeartRate(data)
    // });
  }

  const logout = async () => {
    await Fitness.logout();
    await Fitness.disconnect();
    setIsLogin(false);
  }

  return (
    <ScrollView style={{flex: 1, flexDirection: 'column'}}>
      <TouchableOpacity onPress={()=>{getFitness()}} style={{alignItems: 'center', marginTop: 30, padding: 30, borderWidth: 1}}>
        <Text>Press to fetch Fitness (Data from 2022-04-21 to 2022-04-30)</Text>
      </TouchableOpacity>
      <Text>      Steps</Text>
      {steps.map((e)=>{return <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Date: {e.startDate}</Text>
        <Text>     Steps: {e.quantity} steps</Text>
      </View>})}
      <Text>      Distances</Text>
      {distances.map((e)=>{return <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Date: {e.startDate}</Text>
        <Text>     Distances: {e.quantity.toFixed(2)} meters</Text>
      </View>})}
      <Text>      Calories</Text>
      {calories.map((e)=>{return <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Date: {e.startDate}</Text>
        <Text>     Calories: {e.quantity.toFixed(2)} kilocalories </Text>
      </View>})}
      {/* <Text>      HeartRates</Text>
      {heartRates.map((e)=>{return <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Date: {e.startDate}</Text>
        <Text>     HeartRates: {e.quantity} bpm</Text>
      </View>})} */}
    </ScrollView>
  )
}

export default App