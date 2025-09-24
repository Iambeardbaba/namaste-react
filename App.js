 const heading = React.createElement("h1", {id: "Parent"}, React.createElement("div", {id: "child"}, "I am an H1 Tag"));
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(heading);

            