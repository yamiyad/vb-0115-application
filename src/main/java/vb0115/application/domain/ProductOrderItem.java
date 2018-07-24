package vb0115.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A ProductOrderItem.
 */
@Entity
@Table(name = "product_order_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductOrderItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "calculated_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal calculatedPrice;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("orderItems")
    private ProductOrder order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public ProductOrderItem quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getCalculatedPrice() {
        return calculatedPrice;
    }

    public ProductOrderItem calculatedPrice(BigDecimal calculatedPrice) {
        this.calculatedPrice = calculatedPrice;
        return this;
    }

    public void setCalculatedPrice(BigDecimal calculatedPrice) {
        this.calculatedPrice = calculatedPrice;
    }

    public Product getProduct() {
        return product;
    }

    public ProductOrderItem product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProductOrder getOrder() {
        return order;
    }

    public ProductOrderItem order(ProductOrder productOrder) {
        this.order = productOrder;
        return this;
    }

    public void setOrder(ProductOrder productOrder) {
        this.order = productOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductOrderItem productOrderItem = (ProductOrderItem) o;
        if (productOrderItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productOrderItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductOrderItem{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", calculatedPrice=" + getCalculatedPrice() +
            "}";
    }
}
