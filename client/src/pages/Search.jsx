import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useReducer } from "react";
import { Button, Form } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import Message from "../components/Message";
import ProductsComponent from "../components/ProductsComponent";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";

// Search page
function Search() {
    const store = useContext(contextStore);
    const { userType } = store.userStore.userData;
    const { Label, Select, Group } = Form;
    let [search, searchDispatch] = useOutletContext();
    const [filter, fiterDispatch] = useReducer(useStateReducer, {});

    let searchComp = [];
    const filterValues = Object.values(filter)
    const filterLength = filterValues.length

    // Search Filtering
    if (filterLength) {
        if (filter.filter1) {
            searchComp = search.filter(
                ({ category, ...product }, index) => {
                    if (category === filter.filter1) {
                        return product
                    }
                }
            )
            if (filter.filter2 && searchComp.length) {
                if (searchComp.length) {
                    search = searchComp
                }
                if (filter.filter3) {
                    if (filter.filter2 === "price" || filter.filter2 === "rating") {
                        if (filter.filter3 === "ascending") {
                            searchComp = search.sort((a, b) => a[filter.filter2] - b[filter.filter2])
                        }
                        else if (filter.filter3 === "descending") {
                            searchComp = search.sort((a, b) => b[filter.filter2] - a[filter.filter2])
                        }
                        else {
                            searchComp = search
                        }
                    }
                    else {
                        if (filter.filter3 === "ascending") {
                            searchComp = search.sort((a, b) => a[filter.filter2].charCodeAt() - b[filter.filter2].charCodeAt())
                        }
                        else if (filter.filter3 === "descending") {
                            searchComp = search.sort((a, b) => b[filter.filter2].charCodeAt() - a[filter.filter2].charCodeAt())
                        }
                        else {
                            searchComp = search
                        }
                    }
                }
                else {
                    if (searchComp.length) {
                        if (filter.filter2 === "price" || filter.filter2 === "rating") {
                            searchComp = search.sort((a, b) => a[filter.filter2] - b[filter.filter2])
                        }
                        else {
                            searchComp = search.sort((a, b) => a[filter.filter2].charCodeAt() - b[filter.filter2].charCodeAt())
                        }
                    }
                }
            }
            else {
                if (searchComp.length) {
                    search = searchComp
                }
                if (filter.filter3 && searchComp.length) {
                    if (filter.filter3 === "ascending") {
                        searchComp = search.sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt())
                    }
                    else if (filter.filter3 === "descending") {
                        searchComp = search.sort((a, b) => b.title.charCodeAt() - a.title.charCodeAt())
                    }
                    else {
                        searchComp = search
                    }
                }
            }
        }
        else {
            if (filter.filter2) {
                if (searchComp.length) {
                    search = searchComp
                }
                if (filter.filter3) {
                    if (filter.filter2 === "price" || filter.filter2 === "rating") {
                        if (filter.filter3 === "ascending") {
                            searchComp = search.sort((a, b) => a[filter.filter2] - b[filter.filter2])
                        }
                        else if (filter.filter3 === "descending") {
                            searchComp = search.sort((a, b) => b[filter.filter2] - a[filter.filter2])
                        }
                        else {
                            searchComp = search
                        }
                    }
                    else {
                        if (filter.filter3 === "ascending") {
                            searchComp = search.sort((a, b) => a[filter.filter2].charCodeAt() - b[filter.filter2].charCodeAt())
                        }
                        else if (filter.filter3 === "descending") {
                            searchComp = search.sort((a, b) => b[filter.filter2].charCodeAt() - a[filter.filter2].charCodeAt())
                        }
                        else {
                            searchComp = search
                        }
                    }
                }
                else {
                    if (filter.filter2 === "price" || filter.filter2 === "rating") {
                        searchComp = search.sort((a, b) => a[filter.filter2] - b[filter.filter2])
                    }
                    else {
                        searchComp = search.sort((a, b) => a[filter.filter2].charCodeAt() - b[filter.filter2].charCodeAt())
                    }
                }
            }
            else {
                if (searchComp.length) {
                    search = searchComp
                }
                if (filter.filter3) {
                    if (filter.filter3 === "ascending") {
                        searchComp = search.sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt())
                    }
                    else if (filter.filter3 === "descending") {
                        searchComp = search.sort((a, b) => b.title.charCodeAt() - a.title.charCodeAt())
                    }
                    else {
                        searchComp = search
                    }
                }
            }
        }
    }
    else {
        searchComp = search
    }

    function recordChange(event, filterName) {
        const value = event.target.value;
        filter[filterName] = value;

        if (!value) {
            delete filter[filterName]
        }
        fiterDispatch({ ...filter })

    }

    return (
        <>
            {search.length
                ?
                <>
                    <div className="d-flex px-4 px-md-5 pt-4">
                        <Form className="d-flex flex-fill gap-4 align-items-center flex-wrap">
                            <Group className="d-flex gap-2 align-items-end flex-fill" controlId="category">
                                <Label className="fw-medium flex-one-third text-sm-center">Category</Label>
                                <Select className="outline-0 flex-two-third m-0" onChange={(e) => recordChange(e, "filter1")} >
                                    <option value="">. . .</option>
                                    <option value="Food">Food</option>
                                    <option value="Litter">Litter</option>
                                    <option value="Accessory">Accessory</option>
                                    <option value="Toy">Toy</option>
                                </Select>
                            </Group>
                            <Group className="d-flex gap-2 align-items-end flex-fill" controlId="sortby">
                                <Label className="fw-medium flex-one-third text-nowrap text-sm-center">Sort By</Label>
                                <Select className="outline-0 flex-two-third m-0" onChange={(e) => recordChange(e, "filter2")} >
                                    <option value="">. . .</option>
                                    <option value="price">Price</option>
                                    <option value="age">Age</option>
                                    <option value="title">Name</option>
                                    {
                                        (userType === "seller" || userType === "admin")
                                            ?
                                            ""
                                            :
                                            <option value="rating">Ratings</option>
                                    }
                                    <option value="category">Category</option>
                                </Select>
                            </Group>
                            <Group className="d-flex gap-1 align-items-end flex-fill" controlId="sortby">
                                <Label className="fw-medium flex-one-third text-sm-center">From</Label>
                                <Select className="outline-0 flex-two-third m-0" onChange={(e) => recordChange(e, "filter3")} >
                                    <option value="">. . .</option>
                                    <option value="ascending">Low to High</option>
                                    <option value="descending">High to Low</option>
                                </Select>
                            </Group>
                            <Button type="reset" className=" align-self-end" onClick={() => fiterDispatch({})}>Clear Filters</Button>
                        </Form>
                    </div>
                    {searchComp.length
                        ?
                        < ProductsComponent {...{ products: searchComp, userType }} />
                        :
                        <Message text={`No results found in ${filter.filter1}.`} icon={faMagnifyingGlass} iconClas="opacity-50" color="#0dcaf0" size="8x" />

                    }
                </>
                :
                <Message text="No results found." icon={faMagnifyingGlass} iconClas="opacity-50" color="#0dcaf0" size="8x" />
            }
        </>
    )
}

export default Search;