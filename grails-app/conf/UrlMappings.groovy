class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(controller: "staticView")
		"/$action"(controller: "staticView")
		"/*.html"(controller: "staticView")
		"/species/$action"(controller: "species", action: "$action")
		"500"(view:'/error')
	}
}
