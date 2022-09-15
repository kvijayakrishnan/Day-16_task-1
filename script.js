
// get table data from parsing external JSON filedata
let jsondata = JSON.parse(data);
console.log(jsondata);

for (let i = 0; i < jsondata.length; i++) {
    console.log(jsondata[i].id, jsondata[i].name, jsondata[i].email)
}

//create HTML elements using JS
const div1 = document.createElement('div');
div1.setAttribute("class", "div1");
const label = document.createElement('label');
label.innerHTML = "view data per page:  ";
const select = document.createElement('select');
select.setAttribute("class", "dataPerPage");
select.innerHTML = `
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>`;
label.append(select);
div1.append(label);
document.body.append(div1);


const div2 = document.createElement('div');
div2.setAttribute("class", "table");
div2.innerHTML = `<table>
<thead>
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>E-mail</th>
    </tr>
</thead>
<tbody></tbody>
</table>`;
document.body.append(div2);



// select.onchange = function ()
// {
//     let dataPerPage = select.value;
// console.log(dataPerPage);
// document.querySelector("tbody").innerHTML ="";
// for(let i=0; i<+dataPerPage; i++)
// {
// const tr= document.createElement('tr');
// tr.innerHTML =`<td>${jsondata[i].id}</td>
// <td>${jsondata[i].name}</td>
// <td>${jsondata[i].email}</td>`; 
// document.querySelector("tbody").append(tr);
// }
// }
// select.onchange();

//pagination Script starts here

const div3 = document.createElement('div');
div3.setAttribute("class", "pagination");
document.body.append(div3);
const ul = document.createElement('ul');
div3.append(ul);

let totalPages = Math.ceil(jsondata.length / 5); // initial total number of pages with 5 row data per page
let page = 1; // current page

//this below will assign total number of page for a change in total row data per page
select.onchange = function () {
    let dataPerPage = Math.ceil(jsondata.length / parseInt(select.value));
    createPagination(dataPerPage, 1);
}

createPagination(totalPages, page);  // calling the function to create li elements onload of the page once

function createPagination(totalPages, page) {

    let liTag = '';
    let active;
    let beforePage = page - 2;
    let afterPage = page + 2;

    if (page > 1) {
        liTag += ` <li class="first btn" onclick="createPagination( ${totalPages}, ${1})">First</li>
        <li class="prev btn" onclick="createPagination( ${totalPages}, ${page - 1})">Prev</li>`
    }  // this if statement create prev and first button only when current page moves away from first page

    if (page == 1) {
        beforePage = 1;
        afterPage = 5;
    } else if (page == 2) {
        beforePage = 1;
        afterPage = 5;
    }

    if (page == totalPages) {
        beforePage = totalPages - 4;
        afterPage = totalPages;
    } else if (page == totalPages - 1) {
        beforePage = totalPages - 4;
        afterPage = totalPages;
    }// this if loop initialize total of number buttons if pages are greater than or =5

    if (totalPages < 5) {
        beforePage = 1;
        afterPage = totalPages;
    } // this if loop initialize total of number buttons if pages are less than 5

    for (let pLen = beforePage; pLen <= afterPage; pLen++) {
        if (page === pLen) {
            active = "active";
        } else {
            active = "";
        }

        liTag += `<li class="number ${active}" onclick="createPagination(${totalPages}, ${pLen})">${pLen}</li>`
    } // this for loop creates the number buttons. 

    if (page < totalPages) {
        liTag += ` <li class="next btn" onclick="createPagination( ${totalPages}, ${page + 1})">Next</li>
        <li class="last btn" onclick="createPagination( ${totalPages}, ${totalPages})">Last</li>`
    }// this if statement create last and next button only when current page moves away from last page

    console.log(totalPages, page);

    //Create row element and appends table row and data with respect to value got from dropdown inputbox.
    document.querySelector("tbody").innerHTML = "";

    let dataPerPage = document.querySelector('.dataPerPage').value;
    let rowFirst = page * (+dataPerPage) - (+dataPerPage);
    let rowLast = rowFirst + (+dataPerPage);
    try {
        for (let i = rowFirst; i < rowLast; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${jsondata[i].id}</td>
                        <td>${jsondata[i].name}</td>
                        <td>${jsondata[i].email}</td>`;
            document.querySelector("tbody").append(tr);
        }
    }
    catch (err) {
        console.log("JSON data ended");
    }// try catch is used to eliminate error of undefined that happens at last page when 
    //the for loop cannot access data from json since it is not available

    ul.innerHTML = liTag;
    // console.log(liTag);
    // return liTag;
}
// Footer






