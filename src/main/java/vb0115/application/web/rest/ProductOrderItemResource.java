package vb0115.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import vb0115.application.domain.ProductOrderItem;
import vb0115.application.service.ProductOrderItemService;
import vb0115.application.web.rest.errors.BadRequestAlertException;
import vb0115.application.web.rest.util.HeaderUtil;
import vb0115.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductOrderItem.
 */
@RestController
@RequestMapping("/api")
public class ProductOrderItemResource {

    private final Logger log = LoggerFactory.getLogger(ProductOrderItemResource.class);

    private static final String ENTITY_NAME = "productOrderItem";

    private final ProductOrderItemService productOrderItemService;

    public ProductOrderItemResource(ProductOrderItemService productOrderItemService) {
        this.productOrderItemService = productOrderItemService;
    }

    /**
     * POST  /product-order-items : Create a new productOrderItem.
     *
     * @param productOrderItem the productOrderItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productOrderItem, or with status 400 (Bad Request) if the productOrderItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-order-items")
    @Timed
    public ResponseEntity<ProductOrderItem> createProductOrderItem(@Valid @RequestBody ProductOrderItem productOrderItem) throws URISyntaxException {
        log.debug("REST request to save ProductOrderItem : {}", productOrderItem);
        if (productOrderItem.getId() != null) {
            throw new BadRequestAlertException("A new productOrderItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductOrderItem result = productOrderItemService.save(productOrderItem);
        return ResponseEntity.created(new URI("/api/product-order-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-order-items : Updates an existing productOrderItem.
     *
     * @param productOrderItem the productOrderItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productOrderItem,
     * or with status 400 (Bad Request) if the productOrderItem is not valid,
     * or with status 500 (Internal Server Error) if the productOrderItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-order-items")
    @Timed
    public ResponseEntity<ProductOrderItem> updateProductOrderItem(@Valid @RequestBody ProductOrderItem productOrderItem) throws URISyntaxException {
        log.debug("REST request to update ProductOrderItem : {}", productOrderItem);
        if (productOrderItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductOrderItem result = productOrderItemService.save(productOrderItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productOrderItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-order-items : get all the productOrderItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productOrderItems in body
     */
    @GetMapping("/product-order-items")
    @Timed
    public ResponseEntity<List<ProductOrderItem>> getAllProductOrderItems(Pageable pageable) {
        log.debug("REST request to get a page of ProductOrderItems");
        Page<ProductOrderItem> page = productOrderItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/product-order-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /product-order-items/:id : get the "id" productOrderItem.
     *
     * @param id the id of the productOrderItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productOrderItem, or with status 404 (Not Found)
     */
    @GetMapping("/product-order-items/{id}")
    @Timed
    public ResponseEntity<ProductOrderItem> getProductOrderItem(@PathVariable Long id) {
        log.debug("REST request to get ProductOrderItem : {}", id);
        Optional<ProductOrderItem> productOrderItem = productOrderItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productOrderItem);
    }

    /**
     * DELETE  /product-order-items/:id : delete the "id" productOrderItem.
     *
     * @param id the id of the productOrderItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-order-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductOrderItem(@PathVariable Long id) {
        log.debug("REST request to delete ProductOrderItem : {}", id);
        productOrderItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
