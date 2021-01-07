// YOUR CODE HERE!

final_data = data

let dropdown_menu_items = ["datetime", "city", "state", "country", "shape"]
let dropdown_menu_defaults = ["Choose an option", "Choose an option", "Choose an option", "Choose an option", "Choose an option"]


let tbody = d3.select("tbody");

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
    filtered_dropdown_menu_defaults = []
    temp_data = data;
    activate_dropdown();
    })


function activate_dropdown(){

    for(let i = 0, n = dropdown_menu_defaults.length; i<n; i++){
        d3.select(`.${dropdown_menu_items[i]}`).selectAll("option").remove();
        let selection = d3.select(`.${dropdown_menu_items[i]}`)
        selection.append("option").text(dropdown_menu_defaults[i]).attr("disabled", true).attr("selected", true).attr("value", "")
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

// Button function:

var filtered_menu_items = []
var filtered_dropdown_menu_defaults = []
var temp_data = data

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

    // MENU ITEMS

    for (let x = 0, f = list_of_variables_selected.length; x<f; x++){       
        for(let i = 0, n = dropdown_menu_items.length; i<n; i++){
            let menu_item = `${dropdown_menu_items[i]}`
            if (list_of_variables_selected[x] === dropdown_menu_items[i]){    
                //  
            }else{
                if (filtered_menu_items.includes(dropdown_menu_items[i])===false){
                    filtered_menu_items.push(dropdown_menu_items[i])
                    filtered_dropdown_menu_defaults.push(dropdown_menu_defaults[i])
                }

            }
        }}

        for (let x = 0, f = list_of_variables_selected.length; x<f; x++){
            for (let i = filtered_menu_items.length; i>0; i--){
                if (list_of_variables_selected[x] === filtered_menu_items[i]){
                    filtered_menu_items.splice(i,1)
                }
            }
        }

        console.log(filtered_menu_items)

// CORREGIR

    for(let i = 0, n = filtered_menu_items.length; i<n; i++){
        let menu_item = `${filtered_menu_items[i]}`
        
            d3.select(`.${menu_item}`).selectAll("option").remove();

            // This is to add the dropdown menu defaults in the first line 
            let selection = d3.select(`.${menu_item}`)
            selection.append("option").text(filtered_dropdown_menu_defaults[i]).attr("disabled", true).attr("selected", true).attr("value", "")
            
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

var list_of_variables_selected = []

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

