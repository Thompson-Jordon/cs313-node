/**
 * @file Testing how to use jquery
 */

"use strict";
const ERROR = { message: "The request failed!" };

// do this to get the page to load before listeners
$(function() {
  // Set vars
  let myform = $("#myform"),
    display = $("#display");

  myform.on('submit', function(e) {

   e.preventDefault();

   let target = '/test';

   // perform ajax
   $.get(target, function(res) {
      display.html(res);
   }).fail(() => {
      display.html('<div>' + JSON.stringify(ERROR) + '</div>');
   })
  });
});
