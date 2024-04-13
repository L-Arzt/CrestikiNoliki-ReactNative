import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, TouchableHighlight } from 'react-native';

export default function App() {
  const [notification, setNotification] = useState('Начинайте')

  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [secondPlayer, setSecondPlayer] = useState("O")

  const [refresh, setRefresh] = useState(false)
  const [board, setBoard] = useState([
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
  ])


  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);




  const pressField = (index) => {
    let newBoard = board
    if (newBoard[index] !== "X" && newBoard[index] !== "O") {
      if (currentPlayer == "X") {
        newBoard[index] = "X"
        setCurrentPlayer("O")

        setNotification("Очередь нолика")
      } else {
        newBoard[index] = "O"
        setCurrentPlayer("X")

        setNotification("Очередь крестика")
      }

      setBoard(newBoard)
      setRefresh(!refresh)

      checkIdPlayerWin()
    }

  };

  const checkIdPlayerWin = () => {

    if (board[0] == board[1] && board[1] == board[2] && board[0] !== " ") {
      playerWin(board[0])
    }
    else if (board[3] == board[4] && board[4] == board[5] && board[5] !== " ") {
      playerWin(board[3])
    }
    else if (board[6] == board[7] && board[7] == board[8] && board[8] !== " ") {
      playerWin(board[6])
    }
    else if (board[0] == board[4] && board[4] == board[8] && board[8] !== " ") {
      playerWin(board[0])
    }
    else if (board[0] == board[3] && board[3] == board[6] && board[6] !== " ") {
      playerWin(board[0])
    }
    else if (board[1] == board[4] && board[4] == board[7] && board[7] !== " ") {
      playerWin(board[1])
    }
    else if (board[2] == board[4] && board[4] == board[6] && board[6] !== " ") {
      playerWin(board[2])
    }
    else if (board[2] == board[5] && board[5] == board[8] && board[8] !== " ") {
      playerWin(board[2])
    }
  };
  const playerWin = (textWin) => {
    alert("Игрок " + textWin + " выиграл")
    setBoard([
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " "
    ])
    if (textWin == "O") {
      setNotification("X начинает")
      setOWins(oWins + 1);
    } else {
      setNotification("O начинает")
      setXWins(xWins + 1);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/bg.jpg')} style={styles.imagebg} />
      <View style={styles.namegame}>Крестики нолики</View>
      <Text style={styles.text}>{notification}</Text>

      <View style={styles.WinСounter}>
        <Text style={styles.text}>Побед X: {xWins}</Text>
        <Text style={styles.text}>Побед O: {oWins}</Text>
      </View>

      <View>
        <Image source={require('./assets/R (3).png')} style={styles.image2} />


        <FlatList style={styles.list} data={board} extraData={refresh} numColumns={3} renderItem={({ item, index }) => (

          <TouchableOpacity style={styles.square} onPress={() => pressField(index)}>
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        )}
        />

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto'
  },
  namegame: {
    fintSize: 30,
  },

  text: {
    fontSize: 18,
    color: 'green',
    padding: 10,
  },
  list: {
    width: 300,
    height: 300
  },
  square: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    margin: 20
  },
  item: {
    fontSize: 30,

  },

  imagebg: {
    width: "100%",
    height: '100%',
    position: 'absolute',
    zIndex: -1
  },

  image2: {
    width: 300,
    height: 300,
    position: 'absolute',
  },
  WinСounter: {
    flexDirection: 'row'

  }
});
