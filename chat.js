var socket = io("http://localhost:4201");
let user = "",
  friend = ""

socket.on('sendMessage', (msg)=>{
    if( msg.friend === $("#yourName").val().trim() || msg.user === $("#yourName").val().trim()){
        $("#m").append(`${ msg.user === $("#yourName").val().trim() ? "you) " : msg.user+") "}
         ${msg.message}<br/>`)        
    }
});

socket.on('isTyping', (msg)=>{
    if( msg.friend === $("#yourName").val().trim()){
        $("#typing").text(`${msg.user} is typing`)   
        setTimeout(() => $("#typing").text(""), 2500)             
    }  
});

$("#send").click(()=>{
    console.log('')
     
    let m = `${$("#message").val().trim()}`,
    f = $("#friendName").val().trim(),
    u = $("#yourName").val().trim();
    $("#message").val('')
    if( m.length > 0 && 
        f.length > 0 && 
        u.length > 0 &&
        u !== f       
        ){    
        socket.emit('sendMessage', {
            user : u,
            friend : f,
            message : m
        });   
    }
})

$( "#message" ).keydown(()=>{
    let m = $("#message").val().trim(),
    f = $("#friendName").val().trim(),
    u = $("#yourName").val().trim()
    if( m.length > 0 && 
        f.length > 0 && 
        u.length > 0 &&
        u !== f       
        ){
            socket.emit('isTyping', {
                user : u,
                friend : f
            });             
        }    
})