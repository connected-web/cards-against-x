# Cards Against X

A template for themeing and rendering your own Cards Against X cards.

## Intent

- Create separate word lists for black and white cards
- Modify the HTML template to suit your needs
- Run the render command
- Create lots of individual card files as high resolution PNGs to submit for printing

## Supported Commands

### Local Hosting

Host the server for rendering cards:
```
npm start
```

After starting the server, visit: http://localhost:12500/static/template.html and http://localhost:12500/static/card.html to see the template that will be rendered.

These two pages share the same CSS from cards.css to present the same designs in different sizes.

### Rendering

Run the renderer against the card template:
```
npm run render
```

## Milestones

Current planned milestones:

- (/) Create a basic HTML / CSS template
- (/) Create a Github project
- (/) Create local hosting solution for previewing changes
- (/) Add phantomjs support to render template to PNG
- (x) Feed template with data from text files
- (x) Render multiple images using data from text files
- (x) Support multiple templates using data from different text files

## More Info

This project is just getting started, raise an Issue within this github space to help us develop it.
