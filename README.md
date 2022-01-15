<br/>
<div>
	<a href="https://github.com/kicad-rs/serde_sexpr/actions/workflows/rust.yml">
		<img alt="build status" src="https://github.com/kicad-rs/serde_sexpr/actions/workflows/rust.yml/badge.svg"/>
	</a>
	<a href="https://kicad-rs.github.io/serde_sexpr/tarpaulin-report.html">
		<img alt="coverage report" src="https://kicad-rs.github.io/serde_sexpr/coverage.svg"/>
	</a>
	<a href="https://crates.io/crates/serde_sexpr">
		<img alt="serde_sexpr on crates.io" src="https://img.shields.io/crates/v/serde_sexpr.svg"/>
	</a>
	<a href="https://docs.rs/serde_sexpr">
		<img alt="serde_sexpr on docs.rs" src="https://docs.rs/serde_sexpr/badge"/>
	</a>
	<a href="https://kicad-rs.github.io/serde_sexpr/doc/serde_sexpr/index.html">
		<img alt="rustdoc of main branch" src="https://img.shields.io/badge/docs-main-blue.svg"/>
	</a>
</div>

# serde_sexpr

This crate provides a serde [`Serializer`][__link0] and [`Deserializer`][__link1] implementation for the S-Expression data format used by KiCAD. Since this format differs in some central aspects from other formats like JSON, there are some limitations and special cases you should be aware of:

 - The name of your struct matters. For a simple struct like
	
	
	```rust
	#[derive(Deserialize, Serialize)]
	struct Point(i32, i32);
	```
	
	and an example value `Point(1, 2)` you will get a JSON representation of `[1, 2]` whereas this crate will output `(Point 1 2)`.
	
	
 - The name of the fields also matters if the field’s type is either a boolean, a tuple or a sequence. These fields cannot appear in unnamed containers (i.e. tuple structs).
	
	
 - Deserializing `Option` is not supported, because we need to know the type inside the option to determine if it is present or missing. To deserialize optional values, use the custom deserializing logic from this crate:
	
	
	```rust
	#[derive(Deserialize, Serialize)]
	struct Position {
	    x: i32,
	    y: i32,
	    #[serde(with = "serde_sexpr::Option")]
	    rotation: Option<i32>
	}
	```
	
	
 - If you need to deserialize some sort of container with an unknown number of children, use a special field with an empty name, like so:
	
	
	```rust
	#[derive(Deserialize, Serialize)]
	struct Point(i32, i32);
	
	#[derive(Deserialize, Serialize)]
	struct Polygon {
	    #[serde(default, rename = "")]
	    points: Vec<Point>
	}
	```
	
	Note that this has to be the last field of the struct. There must not be any fields after a field with an empty name, and there must only be one field with an empty name.
	
	
 - Untagged enums are not supported. If you need to parse one from a number of types, use the [`untagged!`][__link2] macro:
	
	
	```rust
	serde_sexpr::untagged! {
	    enum TextOrNumber {
	        Text(String),
	        Int(i32),
	        Float(f32)
	    }
	}
	```
	
	



## License

Licensed under either of [Apache License, Version 2.0](./LICENSE-Apache-2.0) or
[Lesser GNU General Public License, Version 3.0](./LICENSE-LGPL-3.0) at your option.

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in this crate by you,
as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.

 [__link0]: https://docs.rs/serde/1.0.133/serde/?search=serde::ser::Serializer
 [__link1]: https://docs.rs/serde/1.0.133/serde/?search=serde::de::Deserializer
 [__link2]: https://docs.rs/serde_sexpr/0.0.0/serde_sexpr/?search=serde_sexpr::untagged
