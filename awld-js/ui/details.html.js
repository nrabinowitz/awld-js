define('ui/details.htmlc', ['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=res-type>";
  foundHelper = helpers.type;
  stack1 = foundHelper || depth0.type;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "type", { hash: {} }); }
  buffer += escapeExpression(stack1) + ":</span>";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <div class=media><img src=\"http://maps.google.com/maps/api/staticmap?size=120x120&amp;zoom=4&amp;markers=color:blue%7C";
  foundHelper = helpers.latlon;
  stack1 = foundHelper || depth0.latlon;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "latlon", { hash: {} }); }
  buffer += escapeExpression(stack1) + "&amp;sensor=false&amp;maptype=terrain\"></div> ";
  return buffer;}

  buffer += "<h2>";
  foundHelper = helpers.type;
  stack1 = foundHelper || depth0.type;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h2> <div><a href=\"";
  foundHelper = helpers.href;
  stack1 = foundHelper || depth0.href;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "href", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" target=_blank>";
  foundHelper = helpers.href;
  stack1 = foundHelper || depth0.href;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "href", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></div> ";
  foundHelper = helpers.haslatlon;
  stack1 = foundHelper || depth0.haslatlon;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <p>";
  foundHelper = helpers.description;
  stack1 = foundHelper || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>";
  return buffer;});
});