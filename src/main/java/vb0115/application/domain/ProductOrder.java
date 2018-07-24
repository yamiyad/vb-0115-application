package vb0115.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ProductOrder.
 */
@Entity
@Table(name = "product_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "placed_date", nullable = false)
    private Instant placedDate;

    @Column(name = "remarks")
    private String remarks;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductOrderItem> orderItems = new HashSet<>();

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Invoice> invoices = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getPlacedDate() {
        return placedDate;
    }

    public ProductOrder placedDate(Instant placedDate) {
        this.placedDate = placedDate;
        return this;
    }

    public void setPlacedDate(Instant placedDate) {
        this.placedDate = placedDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public ProductOrder remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Set<ProductOrderItem> getOrderItems() {
        return orderItems;
    }

    public ProductOrder orderItems(Set<ProductOrderItem> productOrderItems) {
        this.orderItems = productOrderItems;
        return this;
    }

    public ProductOrder addOrderItem(ProductOrderItem productOrderItem) {
        this.orderItems.add(productOrderItem);
        productOrderItem.setOrder(this);
        return this;
    }

    public ProductOrder removeOrderItem(ProductOrderItem productOrderItem) {
        this.orderItems.remove(productOrderItem);
        productOrderItem.setOrder(null);
        return this;
    }

    public void setOrderItems(Set<ProductOrderItem> productOrderItems) {
        this.orderItems = productOrderItems;
    }

    public Set<Invoice> getInvoices() {
        return invoices;
    }

    public ProductOrder invoices(Set<Invoice> invoices) {
        this.invoices = invoices;
        return this;
    }

    public ProductOrder addInvoice(Invoice invoice) {
        this.invoices.add(invoice);
        invoice.setOrder(this);
        return this;
    }

    public ProductOrder removeInvoice(Invoice invoice) {
        this.invoices.remove(invoice);
        invoice.setOrder(null);
        return this;
    }

    public void setInvoices(Set<Invoice> invoices) {
        this.invoices = invoices;
    }

    public Customer getCustomer() {
        return customer;
    }

    public ProductOrder customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        ProductOrder productOrder = (ProductOrder) o;
        if (productOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductOrder{" +
            "id=" + getId() +
            ", placedDate='" + getPlacedDate() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
