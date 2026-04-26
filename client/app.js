const chat = document.getElementById("chat");
const input = document.getElementById("input");

function add(text, cls){
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send(){
  const msg = input.value;
  if(!msg) return;

  add(msg,"user");
  input.value = "";

  const res = await fetch("http://localhost:5000/chat",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ message: msg })
  });

  const data = await res.json();
  add(data.reply,"ai");
}
