#result

### init state
![init.JPG-21.7kB](http://static.zybuluo.com/helicese/ydszly8j9t7v9dnafd3y7kyy/init.JPG)
### when choose the correct file
![right.JPG-21.8kB](http://static.zybuluo.com/helicese/1wsm0nucmy9fq58tlgzah6fn/right.JPG)

### when choose the incorrect file
![wrong.JPG-30.5kB](http://static.zybuluo.com/helicese/fmllji3xzus9ipb8v2kdj1nz/wrong.JPG)
- when the chosen file is of the wrong type, just disable the submit button

#beautify the input of text
- so easy, just change the style of the border

#beautify the input of file
- the default style cannot be changed, so we hide it
```css
        .file input {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
```
- than we use a fake upload span to do the upload function
- at last, we use a dom to show the name of the upload file in the style we prefer.

#issues
###vertical-align
- there are three inline elements in the file uploading form, I have trouble aligning them at first.
- It turns out that using the correct vertical-align property can easily fix the problem.
- vertical-align is used in `inline`(< img >,< span > etc) or `inline-block`(set by display property) elements
    - `baseline` - This is the **default** value.
    - `top` - Align the top of the element and its descendants with the top of the entire line.
    - `bottom` - Align the bottom of the element and its descendants with the bottom of the entire line.
    - `middle` - Aligns the middle of the element with the middle of **lowercase letters** in the parent.
    - `text-top` - Aligns the top of the element with the top of the **parent element's** font
    - `text-bottom` - Aligns the bottom of the element with the bottom of the **parent element's** font.
    - `sub` - Aligns the baseline of the element with the subscript-baseline of its parent. Like where a < sub > would sit.
    - `super` - Aligns the baseline of the element with the superscript-baseline of its parent. Like where a < sup > would sit.
    - `length` - Aligns the baseline of the element at the given length above the baseline of its parent. (e.g. px, %, em, rem, etc.)
- reference
    - [css tricks -- vertical-align](https://css-tricks.com/almanac/properties/v/vertical-align/)

###handle the path
- I use a some string functions to get the name and type of the file from the path. Maybe Regexp can be more effcient.

#reference
- [css input[type=file] 样式美化，input上传按钮美化](http://www.haorooms.com/post/css_input_uploadmh)