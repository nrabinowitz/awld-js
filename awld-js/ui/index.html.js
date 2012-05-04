define('ui/index.html', ['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var stack1;
  stack1 = depth0;
  stack1 = self.invokePartial(partials.grp, 'grp', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}

  buffer += "<div id=aw-index class=awld> <hr/> <div class=aw-index> <div class=aw-panel> <div class=aw-modules>";
  foundHelper = helpers['t'];
  stack1 = foundHelper || depth0['t'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div> </div> <div class=aw-tab> Ancient World Data: <span class=refs>";
  foundHelper = helpers['c'];
  stack1 = foundHelper || depth0['c'];
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "c", { hash: {} }); }
  buffer += escapeExpression(stack1) + " Reference";
  foundHelper = helpers['p'];
  stack1 = foundHelper || depth0['p'];
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "p", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span> </div> </div> </div>";
  return buffer;});
});