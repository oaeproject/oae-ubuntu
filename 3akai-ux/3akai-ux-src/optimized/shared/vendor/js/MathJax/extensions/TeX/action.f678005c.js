MathJax.Extension["TeX/action"]={version:"2.0"},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var e=MathJax.InputJax.TeX,t=MathJax.ElementJax.mml;e.Definitions.macros.toggle="Toggle",e.Definitions.macros.mathtip="Mathtip",e.Definitions.macros.texttip=["Macro","\\mathtip{#1}{\\text{#2}}",2],e.Parse.Augment({Toggle:function(n){var r=[],i;while((i=this.GetArgument(n))!=="\\endtoggle")r.push(e.Parse(i,this.stack.env).mml());this.Push(t.maction.apply(t,r).With({actiontype:t.ACTIONTYPE.TOGGLE}))},Mathtip:function(e){var n=this.ParseArg(e),r=this.ParseArg(e);this.Push(t.maction(n,r).With({actiontype:t.ACTIONTYPE.TOOLTIP}))}}),MathJax.Hub.Startup.signal.Post("TeX action Ready")}),MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/action.js");