let tbody = document.getElementById("tbody");

(async function loadDefaultData(){
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    let response = await fetch(url);
    let market = await response.json();
    loadDatatoTable(market);
})();

async function loadDefaultData(){
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    let response = await fetch(url);
    let market = await response.json();
    return market;
}

function loadDatatoTable(market){
    market.forEach((item)=>{
        const percentage = parseFloat(item.price_change_percentage_24h).toFixed(2);

        let tr = document.createElement("tr");
        tr.innerHTML = `<td><div class="img-icon"><img src="${item.image}">
        <div class="name">${item.id}</div></div>
                         </td>
                         <td><div class="symbol">${item.symbol}</div></td>
                         <td>$${Intl.NumberFormat('en-US').format(item.current_price)}</td>
                         <td>$${Intl.NumberFormat('en-US').format(item.market_cap)}</td>
                         <td class="${percentage < 0 ? 'percentage--down': 'percentage--up'}">${percentage}%</td>
                         <td>Mkt Cap : $${Intl.NumberFormat('en-US').format(item.total_volume)}</td>`;
        tbody.appendChild(tr);
    })
}


let searchstring = document.getElementById("searchstring");

async function filterData(){
    let data = await loadDefaultData();
    tbody.innerHTML='';
    let resultmarket = data.filter((item)=>{
        let valuestr = searchstring.value.toLowerCase();
        let value = valuestr.trim();
        if((`${item.symbol}`.toLowerCase()).includes(value) || (`${item.id}`.toLowerCase()).includes(value)){
            return true;
        }
    })
    loadDatatoTable(resultmarket);
}

async function sortbyMktCap(){
    let market = await loadDefaultData();
    tbody.innerHTML='';
    market.sort((a,b)=>{
        return a.market_cap - b.market_cap;
    })
    loadDatatoTable(market);
}

async function sortbyPercentage(){
    let market = await loadDefaultData();
    tbody.innerHTML='';
    market.sort((a,b)=>{
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
    })
    loadDatatoTable(market);
}