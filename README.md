Memory Challenge UI
======================

   <br />
   <br />
   
Link to Live
------------
https://memory-app-sigma.now.sh/   

   <br />
   <br />
   
API Documentation
-----------------
API Endpoint - https://nameless-depths-55236.herokuapp.com/


  ### Routes ###


  * ##### ${config.API_ENDPOINT}/api/memory-general/player/${id}
    POST   <br />
    Route for setting up a player's default statistics
  
  * ##### ${config.API_ENDPOINT}/api/memory-general/player/${id}
    PUT   <br />
    Route for posting times if quickest, as well as updating games played and total time played
  
  * ##### ${config.API_ENDPOINT}/api/memory-general/player/${id}
    GET   <br />
    Route for acquiring player statistics
  
  * ##### ${config.API_ENDPOINT}/api/memory-general/experience/${level}
    GET   <br />
    Route for getting high scores at each difficulty level. Public 
       <br />
       <br />
       
   
   Screenshots
   -----------
   ![Alt Landing](/images/001.png)
   ![Alt High Scores](/images/002.png)
   ![Alt Login](/images/003.png)
   ![Alt Game Screen](/images/004.png)
   ![Alt Player Stats](/images/005.png)
      <br />
      <br />
      
   Description
   -----------
   This app is a fun game to challenge your memory! Cards are randomly ordered, face down. Try to find matching pairs
   to clear the game board and try to get the lowest times possible. Login to keep track of your fastest games at each
   difficulty level, as well as total games played, and total time spent clearing the game-board!
      <br />
      <br />

       
   Technologies Used
   -----------------
   * React.JS
   * HTML
   * CSS
   * Node.JS
   * Express.JS
   * PostgresQL
   
