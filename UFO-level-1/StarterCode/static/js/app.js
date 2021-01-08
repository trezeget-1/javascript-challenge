// Some initial definitions

let dropdown_menu_items = ["datetime", "city", "state", "country", "shape"]
let tbody = d3.select("tbody");
let dropdown_menu_defaults = []
for(let i = 0, n = 5; i<5; i++){
    dropdown_menu_defaults.push("Please select an option")
}

// This is the code for filling up the original table on the home screen

function reset_table(){
    data.forEach(d=>{
            let row = tbody.append("tr")
            Object.keys(d).forEach(x=>row.append("td").text(d[x]))
        })
}

reset_table()


// This is the code to eliminating the content of the previous table 

function delete_table(){
    d3.selectAll("td").remove()
}


// Button function:

button = d3.select("#filter-btn")

button.on("click",function(){
    let date_time_for_search = d3.select("#datetime").property("value");
    String(date_time_for_search)

    // This is the code to obtain an array with the filtered data:

    final_data = []

    for (let i=0, n = data.length; i<n; i++){
        if (data[i]["datetime"] === date_time_for_search) {
            final_data.push(data[i]);
        }}
    
    delete_table()

    // This is the code to show the data from the filtered data:

    final_data.forEach(d=>{
            let row = tbody.append("tr")
            Object.keys(d).forEach(x=>row.append("td").text(d[x]))
        })

    })


// This is the code to reset the table 

button_reset = d3.select("#reset-btn")

button_reset.on("click",function(){
    delete_table()
    reset_table()
    list_of_variables_selected = []
    filtered_menu_items = []
    temp_data = data;
    activate_dropdown();
    })

// This is the code to activate the default dropdown menu 

function activate_dropdown(){

    for(let i = 0, n = dropdown_menu_defaults.length; i<n; i++){
        d3.select(`.${dropdown_menu_items[i]}`).selectAll("option").remove();
        let selection = d3.select(`.${dropdown_menu_items[i]}`)
        selection.append("option").text(dropdown_menu_defaults[i]).attr("disabled", true).attr("selected", true).attr("value", "").attr("class","text-center")
    }

    dropdown_menu_items.forEach(x=>{
        let variable_to_modify = x
    
        unique_table = []
    
        for (let i=0, n = data.length; i<n; i++){
                if (unique_table.includes(data[i][variable_to_modify])===false){
                    unique_table.push(data[i][variable_to_modify])
                }
            }
       
        unique_table.forEach(d=>{
                d3.select(`.${variable_to_modify}`).append("option").text(d)
            })
    
    })
}

activate_dropdown()

var filtered_menu_items = []
var list_of_variables_selected = []
var temp_data = data

// This is the code for the Multiple Filter Search BUtton

function button_selected(x){
    list_of_variables_selected.push(x)
    let variable_selected = x
    let class_variable_selected = `.${x}`
    let value_for_search = d3.select(class_variable_selected).property("value");

    // This is the code to obtain an array with the filtered data:

    let final_data = [] 

    for (let i=0, n = temp_data.length; i<n; i++){
        if (temp_data[i][variable_selected] === value_for_search) {
            final_data.push(temp_data[i]);            
        }}
    

    delete_table()

    // This is the code to show the data from the filtered data:

 
    final_data.forEach(d=>{
            let row = tbody.append("tr")
            Object.keys(d).forEach(x=>row.append("td").text(d[x]))
        })

    // This is the code for adding the Dropdown Menu defaults and for the rest of the options, the filters accordingly

    for(let i = 0, n = dropdown_menu_items.length; i<n; i++){
        let menu_item = `${dropdown_menu_items[i]}`
        
            d3.select(`.${menu_item}`).selectAll("option").remove();

            // This is to add the dropdown menu defaults in the first line
            if (list_of_variables_selected.includes(dropdown_menu_items[i])===false){
                let selection = d3.select(`.${menu_item}`)
                selection.append("option").text(dropdown_menu_defaults[i]).attr("disabled", true).attr("selected", true).attr("value", "").attr("class","text-center")
            }
            
            unique_table = []
    
            for (let x=0, j = final_data.length; x<j; x++){
                    if (unique_table.includes(final_data[x][menu_item])===false){
                        unique_table.push(final_data[x][menu_item])
                    }
                }
        
            unique_table.forEach(d=>{
                    d3.select(`.${menu_item}`).append("option").text(d)
                })
    }
    temp_data = final_data      
}

d3.select(".datetime").on("change",function(){
    var a = "datetime"
    button_selected(a)
    })

d3.select(".city").on("change",function(){
    var a = "city"
    button_selected(a)
    })

d3.select(".state").on("change",function(){
    var a = "state"
    button_selected(a)
    })

d3.select(".country").on("change",function(){
    var a = "country"
    button_selected(a)
    })

d3.select(".shape").on("change",function(){
    var a = "shape"
    button_selected(a)
    })