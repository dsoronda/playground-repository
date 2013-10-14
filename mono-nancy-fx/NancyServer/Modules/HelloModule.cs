using System;

using Nancy;

namespace MonoNancyFx.Modules
{
    public class HelloModule : NancyModule
    {
        public HelloModule()
        {
            Get["/"] = parameters => "Hello World";

            Get["/hello/{name}"] = parameters => {
                return "Hello " + parameters["name"];
            };
        }
    }
}