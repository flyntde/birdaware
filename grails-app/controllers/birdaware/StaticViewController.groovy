package birdaware

class StaticViewController {

		def index() { render (view: "nearbyrecent", model: [title: "Nearby Recent"]) }

		def nearbyrecent() { [title: "Nearby Recent"] }

		def notablenearbyrecent() { [title: "Notable Nearby Recent"] }

		def nearbyrecentspp() { }

    def about() { }

    def contact() { }
}
