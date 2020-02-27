

/* Initialization part ends here */

const Airtable = require('airtable')
const Webex = require(`webex`);

const webex = Webex.init({
  credentials: {
    access_token: "MmM2MjA2OTQtMTFhNC00ZDlhLWE2YmItOWZlZjc5OTNkMmIwZTJiZmUxMGMtM2U2_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f"
  }
});

//send webex teams message
let deleteMessage = function(messageId, recordId, question){

  webex.messages.remove(messageId)
  .then(function(response){
      updateStatus(recordId,"DELETED",question)
    })    
  .catch((error) => {
      console.error(error);
      updateStatus(recordId,"FAIL_DEL",question)
    });  
}




//UPDATE THE STATUS 
let updateStatus = function(recordId,status,question){
  
  Airtable.configure({
    apiKey: "keyoPw1vi0AN2TbIP"
  })
      
  const base = Airtable.base("appg6ovHFMJF0lH6O")
  const table = base("PRE")

  if(question=="Q1"){
    table.update(recordId, {
      "Q1_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(question=="Q2"){
    table.update(recordId, {
      "Q2_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(question=="Q3"){
    table.update(recordId, {
      "Q3_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}  
  else if(question=="Q4"){
    table.update(recordId, {
      "Q4_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}    
  else if(question=="Q5"){
    table.update(recordId, {
      "Q5_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}  
  else if(question=="Q6"){
    table.update(recordId, {
      "Q6_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}    
  else if(question=="Q7"){
    table.update(recordId, {
      "Q7_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}   
  else if(question=="Q8"){
    table.update(recordId, {
      "Q8_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}    
  else if(question=="Q9"){
    table.update(recordId, {
      "Q9_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}     
   else if(question=="Q10"){
    table.update(recordId, {
      "Q10_STATUS" : status
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}             
}


// /* Handler function starts here */
exports.handler = function(event, context, callback){

  Airtable.configure({
    apiKey: "keyoPw1vi0AN2TbIP"
  })
      
  const base = Airtable.base("appg6ovHFMJF0lH6O")
  const table = base("PRE")


  let records = []

  // called for every page of records
  const processPage = (partialRecords, fetchNextPage) => {
    records = [...records, ...partialRecords]
    fetchNextPage()
  }

  // called when all the records have been retrieved
  const processRecords = (err) => {
    if (err) {
      console.error(err)
      return
    }

    //process the `records` array
    // use For - - - - bluebird promise. map series // make async funciton send message .. prefix sendmessage with await  // 
    records.forEach(function(record){

      var launchDate = new Date(record.get("Q1_DATE"));
      var now = new Date();
      var deadline = 6000000

      //9 hours 32400000

      //check if pending and then date
      if(record.get("Q1_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q1_MESSAGE_ID"), record.getId(), "Q1")
      
      launchDate = new Date(record.get("Q2_DATE"));    
      if(record.get("Q2_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q2_MESSAGE_ID"), record.getId(), "Q2") 
          
      launchDate = new Date(record.get("Q3_DATE"));    
      if(record.get("Q3_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q3_MESSAGE_ID"), record.getId(), "Q3")       
            
      launchDate = new Date(record.get("Q4_DATE"));    
      if(record.get("Q4_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q4_MESSAGE_ID"), record.getId(), "Q4") 
          
      launchDate = new Date(record.get("Q5_DATE"));    
      if(record.get("Q5_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q5_MESSAGE_ID"), record.getId(), "Q5")
          
      launchDate = new Date(record.get("Q6_DATE"));    
      if(record.get("Q6_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q6_MESSAGE_ID"), record.getId(), "Q6")
          
      launchDate = new Date(record.get("Q7_DATE"));    
      if(record.get("Q7_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q7_MESSAGE_ID"), record.getId(), "Q7")
            
      launchDate = new Date(record.get("Q8_DATE"));    
      if(record.get("Q8_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q8_MESSAGE_ID"), record.getId(), "Q8")
          
      launchDate = new Date(record.get("Q9_DATE"));    
      if(record.get("Q9_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q9_MESSAGE_ID"), record.getId(), "Q9")
                    
      launchDate = new Date(record.get("Q10_DATE"));    
      if(record.get("Q10_STATUS")=="COMPLETE")
        if(now-launchDate>deadline)
          deleteMessage(record.get("Q10_MESSAGE_ID"), record.getId(), "Q10")
    })
  }

  table.select({
    view: "Grid view",
    filterByFormula: 'OR({Q1_STATUS} = "COMPLETE",{Q2_STATUS} = "COMPLETE",{Q3_STATUS} = "COMPLETE",{Q4_STATUS} = "COMPLETE",{Q5_STATUS} = "COMPLETE",{Q6_STATUS} = "COMPLETE",{Q7_STATUS} = "COMPLETE",{Q8_STATUS} = "COMPLETE",{Q9_STATUS} = "COMPLETE",{Q10_STATUS} = "COMPLETE")'
  }).eachPage(processPage, processRecords)

  callback(null,event)
}



