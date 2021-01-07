final_data = []

    for (let i=0, n = data.length; i<n; i++){
        if (data[i][variable_selected] === date_time_for_search) {
            final_data.push(data[i]);
        }}
    
    delete_table()

    // This is the code to show the data from the filtered data:

    final_data.forEach(d=>{
            let row = tbody.append("tr")
            Object.keys(d).forEach(x=>row.append("td").text(d[x]))
        })

