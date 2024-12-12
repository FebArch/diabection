const monitorDocumentUntilOutcomeUpdated = async (username) => {
    const monitorInterval = setInterval(async () => {
      try {
        const doc = await Health.findOne({username});  // Find the document by username
        console.log("Outcome feild not updated: ", doc.outcome)
        if (doc && doc.outcome !== 0) {
          console.log('Outcome field updated:', doc.outcome);
          clearInterval(monitorInterval); // Stop monitoring once outcome is updated
        }
      } catch (err) {
        console.error('Error fetching document');
      }
    }, 1000); // Check every 'interval' milliseconds (1 seconds by default)
  };



  module.exports = monitorDocumentUntilOutcomeUpdated;