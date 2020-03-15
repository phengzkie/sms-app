const express = require("express");
const connectDB = require("./config/db");
const serialportgsm = require("serialport-gsm");

const app = express();

const Collector = require("./models/Collector");
const Coordinator = require("./models/Coordinator");
const Station = require("./models/Station");
const Town = require("./models/Town");
const Province = require("./models/Province");
const Bet = require("./models/Bet");
const Blocking = require("./models/Blocking");
const Limit = require("./models/Limit");

// Connect Database
connectDB();

var gsmModem = serialportgsm.Modem();
let options = {
  baudRate: 115200,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  xon: false,
  rtscts: false,
  xoff: false,
  xany: false,
  buffersize: 0,
  onNewMessage: true,
  onNewMessageIndicator: true,
  autoDeleteOnReceive: true
};

var gsmModem2 = serialportgsm.Modem();
var gsmModem3 = serialportgsm.Modem();
var gsmModem4 = serialportgsm.Modem();
var gsmModem5 = serialportgsm.Modem();
var gsmModem6 = serialportgsm.Modem();
var gsmModem7 = serialportgsm.Modem();
var gsmModem8 = serialportgsm.Modem();

//Port is opened
gsmModem.on("open", () => {
  console.log(`Modem 1 Sucessfully Opened`);

  // now we initialize the GSM Modem
  gsmModem.initializeModem((msg, err) => {
    if (err) {
      console.log(`Error Initializing Modem 1 - ${err}`);
    } else {
      console.log(`InitModemResponse 1: ${JSON.stringify(msg)}`);
      //set mode to PDU mode to handle SMS
      gsmModem.setModemMode((msg, err) => {
        if (err) {
          console.log(`Error Setting Modem Mode - ${err}`);
        } else {
          console.log(`Set Mode: ${JSON.stringify(msg)}`);

          // get the Own Number of the Modem
          gsmModem.getOwnNumber((result, err) => {
            if (err) {
              console.log(`Error retrieving own Number - ${err}`);
            } else {
              console.log(`Own number 1: ${JSON.stringify(result)}`);
            }
          });
        }
      }, "PDU");

      //get info about stored Messages on SIM card
      gsmModem.checkSimMemory((result, err) => {
        if (err) {
          console.log(`Failed to get SimMemory ${err}`);
        } else {
          console.log(`Sim Memory Result 1: ${JSON.stringify(result)}`);
        }
      });
    }
  });

  gsmModem.on("onNewMessage", async data => {
    config(gsmModem, data);
  });

  gsmModem.on("onSendingMessage", data => {
    //whole message data
    console.log(`Event Sending Message: ` + data);
  });
});

//Port for Sim No. 2
gsmModem2.on("open", () => {
  console.log(`Modem 2 Sucessfully Opened`);

  // now we initialize the GSM Modem
  gsmModem2.initializeModem((msg, err) => {
    if (err) {
      console.log(`Error Initializing Modem 2 - ${err}`);
    } else {
      console.log(`InitModemResponse 2: ${JSON.stringify(msg)}`);
      //set mode to PDU mode to handle SMS
      gsmModem2.setModemMode((msg, err) => {
        if (err) {
          console.log(`Error Setting Modem Mode - ${err}`);
        } else {
          console.log(`Set Mode: ${JSON.stringify(msg)}`);

          // get the Own Number of the Modem
          gsmModem2.getOwnNumber((result, err) => {
            if (err) {
              console.log(`Error retrieving own Number - ${err}`);
            } else {
              console.log(`Own number 2: ${JSON.stringify(result)}`);
            }
          });
        }
      }, "PDU");

      //get info about stored Messages on SIM card
      gsmModem2.checkSimMemory((result, err) => {
        if (err) {
          console.log(`Failed to get SimMemory ${err}`);
        } else {
          console.log(`Sim Memory Result 2: ${JSON.stringify(result)}`);
        }
      });
    }
  });

  gsmModem2.on("onNewMessage", async data => {
    config(gsmModem2, data);
  });

  gsmModem2.on("onSendingMessage", data => {
    //whole message data
    console.log(`Event Sending Message: ` + JSON.stringify(data));
  });
});

//Port for Sim No. 3
gsmModem3.on("open", () => {
  console.log(`Modem 3 Sucessfully Opened`);

  // now we initialize the GSM Modem
  gsmModem3.initializeModem((msg, err) => {
    if (err) {
      console.log(`Error Initializing Modem 3 - ${err}`);
    } else {
      console.log(`InitModemResponse 3: ${JSON.stringify(msg)}`);
      //set mode to PDU mode to handle SMS
      gsmModem3.setModemMode((msg, err) => {
        if (err) {
          console.log(`Error Setting Modem Mode - ${err}`);
        } else {
          console.log(`Set Mode: ${JSON.stringify(msg)}`);

          // get the Own Number of the Modem
          gsmModem3.getOwnNumber((result, err) => {
            if (err) {
              console.log(`Error retrieving own Number - ${err}`);
            } else {
              console.log(`Own number 3: ${JSON.stringify(result)}`);
            }
          });
        }
      }, "PDU");

      //get info about stored Messages on SIM card
      gsmModem3.checkSimMemory((result, err) => {
        if (err) {
          console.log(`Failed to get SimMemory ${err}`);
        } else {
          console.log(`Sim Memory Result 3: ${JSON.stringify(result)}`);
        }
      });
    }
  });

  gsmModem3.on("onNewMessage", async data => {
    config(gsmModem3, data);
  });

  gsmModem3.on("onSendingMessage", data => {
    //whole message data
    console.log(`Event Sending Message: ` + JSON.stringify(data));
  });
});

//Port for Sim No. 4
gsmModem4.on("open", () => {
  console.log(`Modem 4 Sucessfully Opened`);

  // now we initialize the GSM Modem
  gsmModem4.initializeModem((msg, err) => {
    if (err) {
      console.log(`Error Initializing Modem 4 - ${err}`);
    } else {
      console.log(`InitModemResponse 4: ${JSON.stringify(msg)}`);

      //set mode to PDU mode to handle SMS
      gsmModem4.setModemMode((msg, err) => {
        if (err) {
          console.log(`Error Setting Modem Mode - ${err}`);
        } else {
          console.log(`Set Mode: ${JSON.stringify(msg)}`);

          // get the Own Number of the Modem
          gsmModem4.getOwnNumber((result, err) => {
            if (err) {
              console.log(`Error retrieving own Number - ${err}`);
            } else {
              console.log(`Own number 4: ${JSON.stringify(result)}`);
            }
          });
        }
      }, "PDU");

      //get info about stored Messages on SIM card
      gsmModem4.checkSimMemory((result, err) => {
        if (err) {
          console.log(`Failed to get SimMemory ${err}`);
        } else {
          console.log(`Sim Memory Result 4: ${JSON.stringify(result)}`);
        }
      });
    }
  });

  gsmModem4.on("onNewMessage", async data => {
    config(gsmModem4, data);
  });

  gsmModem4.on("onSendingMessage", data => {
    //whole message data
    console.log(`Event Sending Message: ` + JSON.stringify(data));
  });
});

//Port for Sim No. 5
gsmModem5.on("open", () => {
  console.log(`Modem 5 Sucessfully Opened`);

  // now we initialize the GSM Modem
  gsmModem5.initializeModem((msg, err) => {
    if (err) {
      console.log(`Error Initializing Modem 5 - ${err}`);
    } else {
      console.log(`InitModemResponse 5: ${JSON.stringify(msg)}`);
      //set mode to PDU mode to handle SMS
      gsmModem5.setModemMode((msg, err) => {
        if (err) {
          console.log(`Error Setting Modem Mode - ${err}`);
        } else {
          console.log(`Set Mode: ${JSON.stringify(msg)}`);

          // get the Own Number of the Modem
          gsmModem5.getOwnNumber((result, err) => {
            if (err) {
              console.log(`Error retrieving own Number - ${err}`);
            } else {
              console.log(`Own number 5: ${JSON.stringify(result)}`);
            }
          });
        }
      }, "PDU");

      //get info about stored Messages on SIM card
      gsmModem5.checkSimMemory((result, err) => {
        if (err) {
          console.log(`Failed to get SimMemory ${err}`);
        } else {
          console.log(`Sim Memory Result 5: ${JSON.stringify(result)}`);
        }
      });
    }
  });

  gsmModem5.on("onNewMessage", async data => {
    config(gsmModem5, data);
  });

  gsmModem5.on("onSendingMessage", data => {
    //whole message data
    console.log(`Event Sending Message: ` + JSON.stringify(data));
  });
});

//Port for Sim No. 6
gsmModem6.on("open", () => {
  console.log(`Modem 6 Sucessfully Opened`);

  // now we initialize the GSM Modem
  gsmModem6.initializeModem((msg, err) => {
    if (err) {
      console.log(`Error Initializing Modem 6 - ${err}`);
    } else {
      console.log(`InitModemResponse 6: ${JSON.stringify(msg)}`);
      //set mode to PDU mode to handle SMS
      gsmModem6.setModemMode((msg, err) => {
        if (err) {
          console.log(`Error Setting Modem Mode - ${err}`);
        } else {
          console.log(`Set Mode: ${JSON.stringify(msg)}`);

          // get the Own Number of the Modem
          gsmModem6.getOwnNumber((result, err) => {
            if (err) {
              console.log(`Error retrieving own Number - ${err}`);
            } else {
              console.log(`Own number 6: ${JSON.stringify(result)}`);
            }
          });
        }
      }, "PDU");

      //get info about stored Messages on SIM card
      gsmModem6.checkSimMemory((result, err) => {
        if (err) {
          console.log(`Failed to get SimMemory ${err}`);
        } else {
          console.log(`Sim Memory Result 6: ${JSON.stringify(result)}`);
        }
      });

      // gsmModem6.deleteAllSimMessages((result, err) => {
      //   if (err) {
      //     console.log(`Failed to Delete All SimMessage ${err}`);
      //   } else {
      //     console.log("Delete Sim Result 6: ", result);
      //   }
      // });
    }
  });

  gsmModem6.on("onNewMessage", async data => {
    config(gsmModem6, data);
  });

  gsmModem6.on("onSendingMessage", data => {
    //whole message data
    console.log(`Event Sending Message: ` + JSON.stringify(data));
  });
});

//Port for Sim No. 7
gsmModem7.on("open", () => {
  console.log(`Modem 7 Sucessfully Opened`);

  // now we initialize the GSM Modem
  gsmModem7.initializeModem((msg, err) => {
    if (err) {
      console.log(`Error Initializing Modem 7 - ${err}`);
    } else {
      console.log(`InitModemResponse 7: ${JSON.stringify(msg)}`);
      //set mode to PDU mode to handle SMS
      gsmModem7.setModemMode((msg, err) => {
        if (err) {
          console.log(`Error Setting Modem Mode - ${err}`);
        } else {
          console.log(`Set Mode: ${JSON.stringify(msg)}`);

          // get the Own Number of the Modem
          gsmModem7.getOwnNumber((result, err) => {
            if (err) {
              console.log(`Error retrieving own Number - ${err}`);
            } else {
              console.log(`Own number 7: ${JSON.stringify(result)}`);
            }
          });
        }
      }, "PDU");

      //get info about stored Messages on SIM card
      gsmModem7.checkSimMemory((result, err) => {
        if (err) {
          console.log(`Failed to get SimMemory ${err}`);
        } else {
          console.log(`Sim Memory Result 7: ${JSON.stringify(result)}`);

          //read the whole SIM card inbox
          // gsmModem7.getSimInbox((result, err) => {
          //   if (err) {
          //     console.log(`Failed to get SimInbox ${err}`);
          //   } else {
          //     console.log("Sim Inbox Result: ", result);
          //   }
          // });

          // gsmModem7.deleteAllSimMessages((result, err) => {
          //   if (err) {
          //     console.log(`Failed to Delete All SimMessage ${err}`);
          //   } else {
          //     console.log("Delete Sim Result: ", result);
          //   }
          // });
        }
      });
    }
  });

  gsmModem7.on("onNewMessage", async data => {
    config(gsmModem7, data);
  });

  gsmModem7.on("onSendingMessage", data => {
    //whole message data
    console.log(`Event Sending Message: ` + JSON.stringify(data));
  });
});

//Port for Sim No. 8
gsmModem8.on("open", () => {
  console.log(`Modem 8 Sucessfully Opened`);

  // now we initialize the GSM Modem
  gsmModem8.initializeModem((msg, err) => {
    if (err) {
      console.log(`Error Initializing Modem 8 - ${err}`);
    } else {
      console.log(`InitModemResponse 8: ${JSON.stringify(msg)}`);

      //set mode to PDU mode to handle SMS
      gsmModem8.setModemMode((msg, err) => {
        if (err) {
          console.log(`Error Setting Modem Mode - ${err}`);
        } else {
          console.log(`Set Mode: ${JSON.stringify(msg)}`);

          // get the Own Number of the Modem
          gsmModem8.getOwnNumber((result, err) => {
            if (err) {
              console.log(`Error retrieving own Number - ${err}`);
            } else {
              console.log(`Own number 8: ${JSON.stringify(result)}`);
            }
          });
        }
      }, "PDU");

      //get info about stored Messages on SIM card
      gsmModem8.checkSimMemory((result, err) => {
        if (err) {
          console.log(`Failed to get SimMemory ${err}`);
        } else {
          console.log(`Sim Memory Result 8: ${JSON.stringify(result)}`);

          //read the whole SIM card inbox
          // gsmModem8.getSimInbox((result, err) => {
          //   if (err) {
          //     console.log(`Failed to get SimInbox ${err}`);
          //   } else {
          //     console.log("Sim Inbox Result: ", result);
          //   }
          // });

          // gsmModem8.deleteAllSimMessages((result, err) => {
          //   if (err) {
          //     console.log(`Failed to Delete All SimMessage ${err}`);
          //   } else {
          //     console.log('Delete Sim Result: ', result);
          //   }
          // });
        }
      });
    }
  });

  gsmModem8.on("onNewMessage", async data => {
    config(gsmModem8, data);
  });

  gsmModem8.on("onMemoryFull", data => {
    gsmModem8.deleteAllSimMessages((result, err) => {
      if (err) {
        console.log(`Failed to Delete All SimMessage ${err}`);
      } else {
        console.log("Delete Sim Result: ", result);
      }
    });
  });

  gsmModem8.on("onSendingMessage", data => {
    //whole message data
    console.log(`Event Sending Message: ` + JSON.stringify(data));
  });
});

// Config for getting the data
const config = async (serial, data) => {
  const { dateTimeSent, sender, message } = data;

  var today = new Date(dateTimeSent);
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  var dateToday = new Date(today);

  if (message.split("=")[0] === "BLOCK") {
    const getBlockType = message.split("=")[1];
    if (message.split("=")[0] === "BLOCK") {
      const mobile = sender.replace(/^.{2}/g, "0");

      const collector = await Collector.findOne({ mobile }).populate(
        "coordinator",
        "_id"
      );

      if (collector) {
        const coordinator = await Coordinator.findOne({
          _id: collector.coordinator
        });

        if (coordinator) {
          const station = await Station.findOne({ _id: coordinator.stationId });
          if (station) {
            const town = await Town.findOne({ _id: station.townId });
            if (town) {
              const province = await Province.findOne({ name: town.province });
              if (province) {
                const blocking = await Blocking.find({
                  date: {
                    $gte: dateToday,
                    $lte: dateToday
                  },
                  type: getBlockType,
                  "location.province": province.name
                });

                if (getBlockType === "L2S3") {
                  const s3 = await Blocking.find({
                    date: {
                      $gte: dateToday,
                      $lte: dateToday
                    },
                    type: "S3",
                    "location.province": province.name
                  });

                  const l2 = await Blocking.find({
                    date: {
                      $gte: dateToday,
                      $lte: dateToday
                    },
                    type: "L2",
                    "location.province": province.name
                  });

                  const s3blocks = [];
                  const l2blocks = [];
                  s3.map(block => {
                    s3blocks.push(block.bet);
                  });

                  l2.map(block => {
                    l2blocks.push(block.bet);
                  });

                  if (s3blocks.length !== 0 && l2blocks.length !== 0) {
                    serial.sendSMS(
                      sender,
                      `L2,${l2blocks}/S3,${s3blocks}`,
                      false,
                      result => {
                        if (
                          result.request === "SendSMS" &&
                          result.status === "success"
                        ) {
                          console.log("Reply for blocking L2S3");
                        }
                      }
                    );
                  }
                }

                const blocks = [];
                blocking.map(block => {
                  blocks.push(block.bet);
                });
                if (blocks.length !== 0) {
                  serial.sendSMS(
                    sender,
                    `${getBlockType},${blocks}`,
                    false,
                    result => {
                      if (
                        result.request === "SendSMS" &&
                        result.status === "success"
                      ) {
                        console.log("Reply for blocking");
                      }
                    }
                  );
                }
              }
            }
          }
        }
      }
    }
  } else if (
    message.split("=")[0] === "S1" ||
    message.split("=")[0] === "S2" ||
    message.split("=")[0] === "S3" ||
    message.split("=")[0] === "L2"
  ) {
    // get the bet game
    const getBetGame = message.split("=")[1].split(":")[0];

    // get the Bet Type
    const getBetType = message.split("=")[0];

    // seperate the msg
    const splitMsg = message.split(":")[1].split(" ");

    const mobile = sender.replace(/^.{2}/g, "0");

    var betGame = "";

    if (getBetGame === "AM" && getBetType === "S1") {
      betGame = `${getBetGame} Cut-Off 11:10AM`;
    }
    if (getBetGame === "AM" && getBetType === "S2") {
      betGame = `${getBetGame} Cut-Off 11:10AM`;
    }
    if (getBetGame === "AM" && getBetType === "S3") {
      betGame = `${getBetGame} Cut-Off 10:50AM`;
    }
    if (getBetGame === "AM" && getBetType === "L2") {
      betGame = `${getBetGame} Cut-Off 10:50AM`;
    }
    if (getBetGame === "PM" && getBetType === "S1") {
      betGame = `${getBetGame} Cut-Off 4:10PM`;
    }
    if (getBetGame === "PM" && getBetType === "S2") {
      betGame = `${getBetGame} Cut-Off 4:10PM`;
    }
    if (getBetGame === "PM" && getBetType === "S3") {
      betGame = `${getBetGame} Cut-Off 3:50PM`;
    }
    if (getBetGame === "PM" && getBetType === "L2") {
      betGame = `${getBetGame} Cut-Off 3:50PM`;
    }
    if (getBetGame === "EXTRA" && getBetType === "S1") {
      betGame = `${getBetGame} Cut-Off 8:20PM`;
    }
    if (getBetGame === "EXTRA" && getBetType === "S2") {
      betGame = `${getBetGame} Cut-Off 8:20PM`;
    }
    if (getBetGame === "EXTRA" && getBetType === "S3") {
      betGame = `${getBetGame} Cut-Off 8:50PM`;
    }
    if (getBetGame === "EXTRA" && getBetType === "L2") {
      betGame = `${getBetGame} Cut-Off 8:50PM`;
    }

    const collector = await Collector.findOne({ mobile }).populate(
      "coordinator",
      "_id"
    );

    if (collector) {
      const coordinator = await Coordinator.findOne({
        _id: collector.coordinator
      });

      if (coordinator) {
        const station = await Station.findOne({ _id: coordinator.stationId });
        if (station) {
          const town = await Town.findOne({ _id: station.townId });
          if (town) {
            const province = await Province.findOne({ name: town.province });
            if (province) {
              const blocking = {
                bet: "None"
              };

              const limits = [];
              const bets = [];
              const betLimits = [];
              const betCombi = [];
              const betCombi2 = [];

              splitMsg.map(msg => {
                msg = msg.split(",");

                Limit.findOne({
                  date: {
                    $gte: dateToday
                  },
                  type: getBetType,
                  game: getBetGame,
                  bet: msg[0],
                  coordinator: coordinator._id
                }).exec(async (err, limit) => {
                  try {
                    if (limit) {
                      betCombi2.push(limit.bet);
                      if (limit.totalAmount + Number(msg[1]) <= 2000) {
                        limits.push("false");

                        const updateTotal = await Limit.findOneAndUpdate(
                          {
                            date: {
                              $gte: dateToday
                            },
                            type: getBetType,
                            bet: msg[0],
                            game: getBetGame,
                            coordinator: coordinator._id
                          },
                          {
                            $inc: { totalAmount: msg[1] }
                          }
                        );
                      } else {
                        limits.push("true");

                        serial.sendSMS(
                          sender,
                          `Limit ${getBetType},${betCombi2}`,
                          false,
                          result => {
                            if (
                              result.request === "SendSMS" &&
                              result.status === "success"
                            ) {
                              console.log(`Reply Success for ${getBetType}`);
                            }
                          }
                        );
                      }

                      // make bet1 object to send into front-end

                      bet1 = {
                        date: dateTimeSent,
                        sender: sender,
                        type: getBetType,
                        game: getBetGame,
                        bet: msg[0],
                        amount: msg[1],
                        collector: collector._id,
                        coordinator: coordinator._id,
                        location: {
                          station: station._id,
                          town: town._id,
                          province: province.name
                        }
                      };
                      bets.push(bet1);

                      if (bets.length === limits.length) {
                        if (limits.includes("true")) {
                        } else {
                          //Save to database

                          serial.sendSMS(
                            sender,
                            `Bet/s Received ${getBetType} ${betGame}`,
                            false,
                            async result => {
                              if (
                                result.request === "SendSMS" &&
                                result.status === "success"
                              ) {
                                await Bet.insertMany(bets, (err, result) => {});
                                console.log("reply success");
                              }
                            }
                          );
                        }
                      }
                    } else {
                      //First bet entry, no limit yet

                      data = {
                        date: dateToday,
                        type: getBetType,
                        bet: msg[0],
                        game: getBetGame,
                        coordinator: coordinator._id,
                        totalAmount: msg[1]
                      };

                      bet1 = {
                        date: dateTimeSent,
                        sender: sender,
                        type: getBetType,
                        game: getBetGame,
                        bet: msg[0],
                        amount: msg[1],
                        collector: collector._id,
                        coordinator: coordinator._id,
                        location: {
                          station: station._id,
                          town: town._id,
                          province: province.name
                        }
                      };
                      bets.push(bet1);
                      betLimits.push(data);

                      if (Number(msg[1]) > 2000) {
                        betCombi.push(msg[0]);
                      }

                      if (Number(msg[1]) <= 2000) {
                        limits.push("false");
                        if (limits.includes("true")) {
                          console.log("may limit", betCombi);
                        } else {
                          if (bets.length === splitMsg.length) {
                            //Save to database

                            serial.sendSMS(
                              sender,
                              `Bet/s Received ${getBetType} ${betGame}`,
                              false,
                              async result => {
                                if (
                                  result.request === "SendSMS" &&
                                  result.status === "success"
                                ) {
                                  await Bet.insertMany(
                                    bets,
                                    (err, result) => {}
                                  );
                                  console.log("reply success");
                                }
                              }
                            );

                            // save to limit db
                            await Limit.insertMany(betLimits, (err, result) => {
                              if (!err) {
                                console.log("limit");
                              }
                            });
                          }
                        }
                      } else {
                        limits.push("true");
                        if (bets.length === splitMsg.length) {
                          serial.sendSMS(
                            sender,
                            `Limit ${getBetType},${betCombi}`,
                            false,
                            result => {
                              if (
                                result.request === "SendSMS" &&
                                result.status === "success"
                              ) {
                                console.log(
                                  `Limit Reply Success for ${getBetType}`
                                );
                              }
                            }
                          );
                        }
                      }
                    }
                  } catch (err) {
                    console.error(err);
                  }
                });

                Blocking.findOne({
                  date: {
                    $gte: dateToday
                  },
                  type: getBetType,
                  "location.province": province.name,
                  bet: msg[0]
                }).exec(async (err, block) => {
                  try {
                    if (block) {
                      blocking.bet = block.bet;
                    }
                  } catch (err) {
                    console.error(err);
                  }
                });
              });
            }
          }
        }
      } else {
        serial.deleteAllSimMessages((result, err) => {
          if (err) {
            console.log(`Failed to Delete All SimMessage ${err}`);
          } else {
            console.log("Delete Sim Result: ", result);
          }
        });
      }
    }
  } else {
    serial.deleteAllSimMessages((result, err) => {
      if (err) {
        console.log(`Failed to Delete All SimMessage ${err}`);
      } else {
        console.log("Delete Sim Result: ", result);
      }
    });
  }
};

// 8-Port Modem
gsmModem.open("COM23", options);
gsmModem2.open("COM24", options);
gsmModem3.open("COM25", options);
gsmModem4.open("COM26", options);
gsmModem5.open("COM27", options);
gsmModem6.open("COM28", options);
gsmModem7.open("COM29", options);
gsmModem8.open("COM30", options);
