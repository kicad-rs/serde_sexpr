initSidebarItems({"fn":[["deserialize_option","Deserialize an [`Option`] without using the [`Deserializer::deserialize_option`] method, but instead try to deserialize the value as if it was present, and return [`None`] if the deserializer returns an error. This allows the deserializer to get type information for the type inside the option, so that we can assume that a value is [`None`] or missing if it has an incorrect type. The s-expr data format simply skips non-present values on serialization, so this is our only way of knowing."]],"mod":[["de",""],["ser",""]],"struct":[["Literal",""]]});